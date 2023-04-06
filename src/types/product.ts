
export interface ProductImage {
    url: string,
    alt?: string
}

export interface ProductPrice {
    value: number,
    currencyCode: "USD" | "EUR" | string
}

export interface ProductOptionValue {
    label: string,
    hexColor?: string
}

export interface ProductOption {
    id: string,
    displayName: string,
    values: ProductOptionValue[]
}

export interface ProductVariant {
    id: string,
    name: string,
    sku:string
    price: number,
    listPrice: number,
    requirementShipping: boolean
    options: ProductOption[]
    image?: ProductImage
}
export interface Product {
    id: string,
    name: string,
    description: string,
    slug: string,
    vendor: string
    path: string,
    images: ProductImage[],
    price: ProductPrice,
    options: ProductOption[],
    variants: ProductVariant[]
}


export type AvailableChoices = "size" | "color" | string

export type Choices = {[P in AvailableChoices]: string}