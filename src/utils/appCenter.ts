export const searchApi = async ({
    query
}:{
    query: string,
}) => {
    const url = 'https://tappscenter.org/api/applications'
    const body = {
        "value": query,
        "filters": {
            "platforms": {
                "name": {
                    "$eq": "weba"
                }
            }
        }
    }

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })
}