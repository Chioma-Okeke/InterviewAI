import apiClient, { thirdPartyApiClient } from "../serviceClients/apiClient"

export class UserAuthentication {

    async signUp(userData) {
        try {
            const response = await apiClient.post(`/signup`, userData)
            return response.data
        } catch (error) {
            console.error('Signup error:', error.response?.data || error.message)
            throw error
        }
    }

    async login(userData) {
        try {
            const response = await apiClient.post(`/signin`, userData)
            return response.data
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message)
            throw error
        }
    }

    async logout(token) {
        try {
            const response = await apiClient.post(`/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.error('Logout error:', error.response?.data || error.message)
            throw error
        }
    }

    async verifyEmail () {
        try {
            const response = await apiClient.get("/user/verify")
            return response.data
        } catch (error) {
            console.error("Email verification error:", error.response?.data || error.message)
            throw error
        }
    }

    async googleSignIn () {
        try {
            const response = await thirdPartyApiClient.get("/google")
            return response.data
        } catch (error) {
            console.error('Google signup error:', error.response?.data || error.message)
            throw error
        }
    }
}