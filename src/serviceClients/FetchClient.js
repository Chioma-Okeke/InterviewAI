import { refreshAccessToken } from "../utils/authUtils"

const FetchClient = {
    async get(url, {setToken, logout}) {
        await ensureTokenIsValid(setToken, logout)
        const storedData = JSON.parse(localStorage.getItem("user_data"))
        const token = storedData?.userToken
        return await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },

    async post (url, body, options = {}) {
        const { setToken, logout } = options;
        await ensureTokenIsValid(setToken, logout) 
        const storedData = JSON.parse(localStorage.getItem("user_data"))
        const token = storedData?.userToken
        return await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...options.headers
            }
        })
    }
}

async function ensureTokenIsValid (setToken, logout) {
    const storedData = JSON.parse(localStorage.getItem("user_data"))
    const accessToken = storedData?.userToken
    const isExpired = checkIfTokenExpired(accessToken)

    if(isExpired) {
        await refreshAccessToken(setToken, logout)
    }
}

function checkIfTokenExpired(token) {
    if (!token) return true

    const tokenPayload = JSON.parse(atob(token.split(",")[1]))
    const expiry = tokenPayload.exp * 1000
    return Date.now() > expiry
}

export default FetchClient    