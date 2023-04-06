import React, {FC, Children, isValidElement, useState, ReactNode} from "react"

import {useKeenSlider} from "keen-slider/react"
import cn from "classnames";

import s from "./ProductSlider.module.css"

interface Props {
    children: ReactNode
}

const ProductSlider: FC<Props> = ({children}) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <div className={s.root}>

            <div ref={sliderRef} className="keen-slider h-full transition-opacity">
                {loaded && instanceRef.current && (
                    <>
                        {
                            currentSlide !== 0 && (
                                <button
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    className={cn(s.leftControl, s.control)}
                                />
                            )
                        }
                        {
                            currentSlide !== instanceRef.current.track.details.slides.length - 1 && (
                                <button
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    className={cn(s.rightControl, s.control)}
                                />

                            )
                        }
                    </>
                )}

                {children}
            </div>

            {loaded && instanceRef.current && (
                <div className={s.dots}>
                    {[
                        ...Array(instanceRef.current.track.details.slides.length).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={cn(
                                    s.dot,
                                    {
                                        [s.active]: currentSlide === idx
                                    }
                                )}

                            ></button>
                        )
                    })}
                </div>
            )}

        </div>
    )
}

export default ProductSlider
