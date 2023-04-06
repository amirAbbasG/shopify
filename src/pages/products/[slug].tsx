import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {ParsedUrlQuery} from "querystring";

import {Layout, ProductView} from "@components";
import {getAllProductsPaths, getProductDetails} from "@services/productServices";
import {Product} from "@/types/product";


export const getStaticPaths: GetStaticPaths = async () => {

    const {products} = await getAllProductsPaths()

    const paths = products.map(productSlug => ({params: productSlug}))

    return {
        paths,
        fallback: false
    }
}

interface Props {
    product: Product | null
}

interface Params extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {

    const {product} = await getProductDetails({slug: params?.slug})
    return {
        props: {
            product
        }
    }
}
const ProductSlug = ({product}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            {product && (<ProductView product={product}/>)}
        </>
    );
};

ProductSlug.Layout = Layout
export default ProductSlug;

