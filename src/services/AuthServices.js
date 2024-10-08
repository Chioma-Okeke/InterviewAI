import apiClient, { thirdPartyApiClient } from "../serviceClients/apiClient"

export class UserAuthentication {

    async signUp(userData) {
        try {
            const response = await apiClient.post(`/signup`, userData)
            return response.data
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                "Error when authenticating user";
            console.error("Sign up error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    async login(userData) {
        try {
            const response = await apiClient.post(`/signin`, userData)
            return response.data
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Error when authenticating user";
            console.error("Sign up error:", errorMessage);
            throw new Error(errorMessage);
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