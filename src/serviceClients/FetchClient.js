export const FetchClient = {
    async get(url, options = {}) {
        return await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        })
    },

    async post (url, body, options = {}) {
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        })
    }
}