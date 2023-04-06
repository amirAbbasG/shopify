import {FetcherParams, FetcherResult} from "@/types/servicesTypes";

const fetchApi = async <T>({query, variables}: FetcherParams): Promise<FetcherResult<T>> => {

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query, variables})
    })

    const {data, errors} = await res.json()

    if (errors) {
        throw new Error(errors[0].message ?? errors.message)
    }

    return {data}
}

export default fetchApi