import {FC, ReactNode} from 'react';

import cn from "classnames";
import ReactMarquee from "react-fast-marquee";

import styles from "./Marquee.module.css"

interface Props {
    children: ReactNode,
    variant?: "primary" | "secondary"
}

const Marquee: FC<Props> = ({children, variant = "primary"}) => {

    const rootClassname = cn(
        styles.root,
        {
            [styles.secondary]: variant === "secondary"
        }
    )
    return (
        <section id="marquee" className={rootClassname}>
            <ReactMarquee speed={50} gradient={false} pauseOnHover={true}>
                <div className={styles.container}>
                    {children}
                </div>
            </ReactMarquee>
        </section>
    );
};

export default Marquee;