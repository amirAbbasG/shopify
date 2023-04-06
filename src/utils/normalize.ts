import {
    ImageEdge,
    Product as ShopifyProduct,
    MoneyV2,
    ProductOption,
    ProductVariantConnection,
    CheckoutLineItemEdge
} from "@/types/schema";
import {Product, ProductOption as ShopifyProductOption} from "@/types/product"
import {Cart, LineItem} from "@/types/cart";
import {MaybeCheckout} from "@/types/servicesTypes";

const normalizeImages = ({edges}: { edges: Array<ImageEdge> }) => {
    return edges.map(({node: {originalSrc, ...rest}}) => {
        return {
            url: `/images/${originalSrc}`,
            ...rest
        }
    })
}

const normalizePrice = ({amount, currencyCode}: MoneyV2) => {
    return {
        value: +amount,
        currencyCode
    }
}

const normalizeOptions = ({id, values, name: displayName}: ProductOption): ShopifyProductOption => {
    return {
        id,
        displayName,
        values: values.map(v => {
            return displayName.match(/colou?r/gi) ? {label: v, hexColor: v} : {label: v}
        })
    }
}

const normalizeVariants = ({edges}: ProductVariantConnection) => {
    return edges.map(({node}) => {
        const {id, sku, title, compareAtPriceV2, priceV2, selectedOptions} = node

        return {
            id,
            name: title,
            sku: sku || id,
            price: +priceV2?.amount,
            listPrice: +compareAtPriceV2?.amount,
            requirementShipping: true,
            options: selectedOptions.map(({name, value}) => {
                return normalizeOptions({id, name, values: [value]})
            })
        }
    })
}
export const normalizeProduct = (productNode: ShopifyProduct): Product => {
    const {
        id,
        title: name,
        handle,
        vendor,
        description,
        images,
        priceRange,
        options,
        variants,
        ...rest
    } = productNode

    return {
        id,
        name,
        vendor,
        description,
        path: `/${handle}`,
        slug: handle.replace(/^\/+|\/+$/g, ""),
        images: normalizeImages(images),
        price: normalizePrice(priceRange.minVariantPrice),
        options: options ?
            options.filter(o => o.name !== "Title").map(o => normalizeOptions(o))
            : [],
        variants: variants ? normalizeVariants(variants) : [],
        ...rest
    }
}

export const normalizeLineItem = ({node: {id, title, variant, ...rest}}: CheckoutLineItemEdge): LineItem => {
    return {
        id,
        name: title,
        variantId: String(variant?.id),
        productId: String(variant?.id),
        path: variant?.product?.handle ?? "",
        discount: [],
        options: variant?.selectedOptions.map(({name, value}) => {
            return normalizeOptions({id, name, values: [value]})
        }),
        variant: {
            id: String(variant?.id),
            sku: variant?.sku ?? "",
            name: variant?.title,
            requirementShipping: variant?.requiresShipping ?? false,
            price: variant?.priceV2.amount,
            listPrice: variant?.compareAtPriceV2?.amount,
            image: {
                url: process.env.NODE_ENV === "development" ?
                    `/images/${variant?.image?.originalSrc}` :
                    variant?.image?.originalSrc ?? "/product-image-placeholder.svg"
            },
        },
        ...rest
    }
}

export const normalizeCart = (checkout: MaybeCheckout): Cart => {
    if (!checkout) {
        throw new Error("checkout is undefined")
    }

    return {
        id: checkout.id,
        createdAt: checkout.createdAt,
        completedAt: checkout.completedAt,
        currency: {
            code: checkout.totalPriceV2.currencyCode
        },
        taxesIncluded: checkout.taxesIncluded,
        lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
        totalPrice: checkout.totalPriceV2.amount,
        lineItems: checkout.lineItems.edges.map(normalizeLineItem),
        discounts: []
    }
}