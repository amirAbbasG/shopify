import {Choices, Product} from "@/types/product";


export const getVariant = (product: Product, choices: Choices) => {
    return product.variants.find(variant => {
        return variant.options.every(option => {
            const optionName = option.displayName.toLowerCase()
            return optionName in choices && choices[optionName] === option.values[0].label
        })
    })
}