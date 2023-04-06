import cookie from "js-cookie"

import fetchApi from "@lib/fetchApi";
import {
    checkoutCreateMutation,
    checkoutLineItemsAddMutation,
    getCheckoutQuery,
    checkoutLineItemsRemoveMutation,
    checkoutLineItemsUpdateMutation
} from "@services/queries";
import {
    Checkout,
    CheckoutLineItemsAddPayload,
    CheckoutLineItemsRemovePayload,
    CheckoutLineItemsUpdatePayload,
    Maybe
} from "@/types/schema";
import {AddItemInput, CreateCheckoutReturn, MaybeCheckout, UpdateItemInput} from "@/types/servicesTypes";
import {Cart} from "@/types/cart";
import {normalizeCart} from "@utils/normalize";

const checkoutId = cookie.get("shopify_checkoutId")

export const getCart = async (): Promise<Cart> => {
    let checkout: MaybeCheckout

    if (checkoutId) {
        checkout = await getCheckout()
    } else {
        checkout = await createCheckout()
    }

    // if (result.data?.completedAt) {
    //     cookie.remove("shopify_checkoutId")
    // }

    return normalizeCart(checkout)
}

const getCheckout = async (): Promise<MaybeCheckout> => {
    const {data} = await fetchApi<{ node: Checkout }>({
        query: getCheckoutQuery,
        variables: {
            checkoutId
        }
    })

    return data.node
}
const createCheckout = async (): Promise<MaybeCheckout> => {

    const {data: {checkoutCreate: {checkout}}} = await fetchApi<CreateCheckoutReturn>({
        query: checkoutCreateMutation
    })

    if (checkout?.id) {
        const options = {
            expires: 90
        }
        cookie.set("shopify_checkoutId", checkout.id, options)
        cookie.set("shopify_checkoutUrl", checkout.webUrl, options)
    }

    return checkout
}

export const addItemToCheckout = async (input: AddItemInput): Promise<Maybe<Cart>> => {
    const {data: {checkout}} = await fetchApi<CheckoutLineItemsAddPayload>({
        query: checkoutLineItemsAddMutation,
        variables: {
            checkoutId,
            lineItems: [
                input
            ]
        }
    })
    if (checkout) {
        return normalizeCart(checkout)

    }

    return null
}

export const removeCheckoutItem = async (id: string): Promise<Maybe<Cart>> => {
    const {data: {checkout}} = await fetchApi<CheckoutLineItemsRemovePayload>({
        query: checkoutLineItemsRemoveMutation,
        variables: {
            checkoutId,
            lineItemIds: [id]
        }
    })

    if (checkout) {
        return normalizeCart(checkout)

    }

    return null
}

export const updateCheckoutItem = async (lineItems: UpdateItemInput): Promise<Maybe<Cart>> => {
    const {data: {checkout}} = await fetchApi<CheckoutLineItemsUpdatePayload>({
        query: checkoutLineItemsUpdateMutation,
        variables: {
            checkoutId,
            lineItems
        }
    })

    if (checkout) {
        return normalizeCart(checkout)

    }

    return null
}