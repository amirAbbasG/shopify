import {FC} from 'react';

import Link from "next/link";
import useSWR from "swr";

import styles from "./NavBar.module.css"
import {Heart, Cart} from "@components/icons"
import {useUiContext} from "@context/UiContext";
import {getCart} from "@services/cartServices";
import {LineItem} from "@/types/cart";

const Navbar: FC = () => {
    const {openSidebar} = useUiContext()

    let cartItemCount = 0

    const {data} = useSWR("get-cart", getCart, {
        revalidateOnFocus: false
    })

    if (data) {
        cartItemCount = data.lineItems.reduce((count: number, item: LineItem) => {
            return count + item.quantity
        }, 0)
    }

    return (
        <header className={styles.root}>

            <Link href="/">
                <h1 className={styles.logo}>NEXT_STORE</h1>
            </Link>

            <nav className=" ml-6 space-x-6 flex-1">
                <Link href="/" className={styles.link}>
                    All
                </Link>
                <Link href="/" className={styles.link}>
                    Clothes
                </Link>
                <Link href="/" className={styles.link}>
                    Accesories
                </Link>
                <Link href="/" className={styles.link}>
                    Shoes
                </Link>
            </nav>

            <ul className="flex">
                <li className={styles.userNavItem} onClick={openSidebar}>
                    <Cart/>
                    {
                        cartItemCount > 0 && (
                            <span className={styles.bagCount}>
                                {cartItemCount}
                            </span>
                        )
                    }
                </li>
                <li className={styles.userNavItem}>
                    <Link href="/wishlist">
                        <Heart/>
                    </Link>
                </li>
            </ul>

        </header>
    );
};

export default Navbar;