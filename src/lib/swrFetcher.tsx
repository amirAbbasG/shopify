import fetchApi from "@lib/fetchApi";

const swrFetcher = async (query: string) => {
    return await fetchApi({
        query,

    })
}