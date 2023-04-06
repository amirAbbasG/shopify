import fetchApi from "@lib/fetchApi";
import {getAllProductsQuery, getProductQuery, getAllProductsPathsQuery} from "@services/queries";
import {normalizeProduct} from "@utils/normalize";
import {Product} from "@/types/product";
import {
    AllProductsType,
    GetAllProductsPathReturn,
    Variables,
    GetProductDetailsType,
    GetProductDetailsReturn
} from "@/types/servicesTypes";


export const getAllProducts = async (): Promise<Product[]> => {

    const {data} = await fetchApi<AllProductsType>({query: getAllProductsQuery})

    return data.products.edges.map(({node: product}) => normalizeProduct(product)) ?? []
};


export const getAllProductsPaths = async (): Promise<GetAllProductsPathReturn> => {

    const {data} = await fetchApi<AllProductsType>({query: getAllProductsPathsQuery})

    const products = data.products.edges.map(({node: {handle}}) => ({slug: handle})) ?? []

    return {
        products
    }
};


export const getProductDetails = async (variables: Variables): Promise<GetProductDetailsReturn> => {

    const {data: {productByHandle}} = await fetchApi<GetProductDetailsType>({query: getProductQuery, variables})

    return {
        product: productByHandle ? normalizeProduct(productByHandle) : null
    }
};