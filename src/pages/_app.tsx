import {FC, ReactNode} from "react";

import type {AppProps} from 'next/app'

import '@styles/globals.css'
import {UiContextProvider} from "@context/UiContext";

import "keen-slider/keen-slider.min.css"

interface LayoutProps {
    children: ReactNode
}

const NoLayout: FC<LayoutProps> = ({children}) => <>{children}</>

export default function App({Component, pageProps}: AppProps & { Component: { Layout: FC<LayoutProps> } }) {

    const Layout = Component.Layout ?? NoLayout

    return (
        <UiContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UiContextProvider>
    )
}
