import {ProductOption, ProductVariant} from "@/types/product";


export interface Discount {
    value: number
}

export interface LineItem {
    id: string,
    name: string,
    variantId: string,
    productId: string,
    path: string,
    quantity: number,
    discount: Discount[]
    options?: ProductOption[]
    variant: Partial<ProductVariant>
}

export interface Cart {
    id: string,
    createdAt: string,
    completedAt: string,
    currency: { code: string }
    taxesIncluded: boolean
    lineItemsSubtotalPrice: number
    totalPrice: number
    lineItems: LineItem[]
    discounts: Discount[]
}