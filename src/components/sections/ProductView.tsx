
import { FC, useState } from 'react'

import Image from "next/image"

import cn from 'classnames'
import {mutate} from "swr"

import styles from './ProductView.module.css'
import { useUiContext } from '@context/UiContext'
import {Button, ProductSlider, Swatch} from "@components";
import {Choices, Product} from '@/types/product'
import {getVariant} from "@utils/helpers";
import {addItemToCheckout} from "@services/cartServices";

interface Props {
  product: Product
}

const ProductView: FC<Props> = ({ product }) => {
  const [ choices, setChoices ] = useState<Choices>({})
  const [ isLoading, setIsLoading ] = useState(false)


  const { openSidebar } = useUiContext()
  const variant = getVariant(product, choices)

  const addToCart = async () => {
    try {
      const item = {
        variantId: String(variant ? variant.id : product.variants[0].id),
        quantity: 1,
      }

      setIsLoading(true)
      await addItemToCheckout(item)
      await mutate("get-cart", false)
      openSidebar()
    } catch(error) {

      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="container">
      <div className={cn(styles.root, 'fit', "mb-5")}>
        <div className={cn(styles.productDisplay, 'fit')}>
          <div className={styles.nameBox}>
            <h1 className={styles.name}>
              {product.name}
            </h1>
            <div className={styles.price}>
              {product.price.value}
              {` `}
              {product.price.currencyCode}
            </div>
          </div>
          <ProductSlider>
            { product.images.map(image =>
              <div key={image.url} className={cn(styles.imageContainer, "keen-slider__slide")}>
                <Image
                  className={styles.img}
                  src={image.url}
                  alt={image.alt ?? "product image"}
                  width={1050}
                  height={1050}
                  quality="85"
                />
              </div>
            )}
          </ProductSlider>
        </div>
        <div className={styles.sidebar}>
          <section>
            { product.options.map(option =>
              <div key={option.id} className="pb-4">
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  {option.values.map(v => (
                      <Swatch
                          active={choices[option.displayName.toLowerCase()] === v.label.toLowerCase()}
                          key={`${option.id}-${v.label}`}
                          color={v.hexColor}
                          label={v.label}
                          onClick={() => setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]: v.label.toLowerCase()
                          })}
                     />
                  ))}
                </div>
              </div>
            )}
            <div className="pb-14 break-words w-full max-w-xl text-lg">
              { product.description }
            </div>
          </section>
          <div>
            <Button
              className={styles.button}
              onClick={addToCart}
              isLoading={isLoading}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView
