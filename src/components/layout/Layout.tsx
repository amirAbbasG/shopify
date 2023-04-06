import {FC, ReactNode} from 'react';

import styles from "./Layout.module.css"
import {Sidebar, CartSidebar, Footer, Navbar} from "@components";

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {

    return (
        <div className={styles.root}>
            <Navbar/>
            <Sidebar>
                <CartSidebar/>
            </Sidebar>
            <main className="fit">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;