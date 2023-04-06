import {InferGetStaticPropsType} from "next";

import styles from "@styles/Home.module.css";
import {getAllProducts} from "@services/productServices";
import {Grid, Hero, Layout, Marquee, ProductCard} from "@components";


export async function getStaticProps() {
    const products = await getAllProducts()

    return {
        props: {
            products,
        },
        revalidate: 4 * 60 * 60,
    };
}

export default function Home(
    {products}: InferGetStaticPropsType<typeof getStaticProps>
) {

    return (
        <>
            <Grid>
                {
                    products.map(p => (
                        <ProductCard product={p} key={p.id}/>
                    ))
                }
            </Grid>

            <Hero
                headline="Cookies, ice cream and muffin"
                description="Marshmallow tart jelly icing cotton candy tootsie roll cotton candy candy canes. Cake liquorice sesame snaps. Cupcake cake cheesecake pie marshmallow lollipop soufflé marshmallow dessert. Cheesecake jujubes halvah chupa chups lollipop tootsie roll. Jelly-o tiramisu jelly toffee cake croissant lemon drops pudding. Donut sesame snaps gummi bears toffee. Sesame snaps jelly-o oat cake chocolate marzipan cake lollipop. Gingerbread cheesecake jujubes fruitcake cake. Tiramisu cotton candy marzipan candy canes oat cake pudding bonbon."
            />

            <Marquee>
                {
                    products.map(p => (
                        <ProductCard product={p} key={p.id} variant="slim"/>
                    ))
                }
            </Marquee>

            <Grid layout="B">
                {
                    products.map(p => (
                        <ProductCard product={p} key={p.id}/>
                    ))
                }
            </Grid>

            <Marquee variant="secondary">
                {
                    products.map(p => (
                        <ProductCard product={p} key={p.id} variant="slim"/>
                    ))
                }
            </Marquee>
        </>
    );
}

Home.Layout = Layout
