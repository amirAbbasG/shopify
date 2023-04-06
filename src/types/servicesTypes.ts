import {ProductConnection, Product as ShopifyProduct, CheckoutCreatePayload, Maybe, Checkout} from "@/types/schema";
import {Product} from "@/types/product";


//fetcher types
export type Variables = {[key: string]: string | undefined | any}

export type FetcherParams = {
    query: string,
    variables?: Variables
}

export type FetcherResult<T> = { data: T }

export type AllProductsType = {
    products: ProductConnection
}

export type GetProductDetailsType = {
    productByHandle: ShopifyProduct
}

//return types
export type GetAllProductsPathReturn = {
    products: Pick<Product, "slug">[]
}

export type GetProductDetailsReturn = {
    product: Product | null
}


export type CreateCheckoutReturn = { checkoutCreate: CheckoutCreatePayload }

export type MaybeCheckout = Maybe<Checkout | undefined>


//input types
export interface AddItemInput {
    variantId: string,
    quantity: number,
}

export interface UpdateItemInput extends AddItemInput {
    id: string
}
