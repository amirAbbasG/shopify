import {FC} from 'react';

import Link from "next/link";

import styles from "./Hero.module.css"

interface Props {
    headline: string,
    description: string
}

const Hero: FC<Props> = ({headline, description}) => {
    return (
        <section id="hero" className="bg-black">
            <div className="container">
                <div className={styles.root}>
                    <h2 className={styles.headline}>
                        {headline}
                    </h2>
                    <div className="flex-1 max-w-4xl">
                        <p className={styles.description}>
                            {description}
                        </p>
                        <Link href="/" className={styles.link}>
                                Read it here
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;