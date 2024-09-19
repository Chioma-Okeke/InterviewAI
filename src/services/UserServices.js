import apiClient from "../serviceClients/apiClient"

export const UserServices = {
    async updateUserProfile (userData) {
        try {
            const response = await apiClient.patch("/users/update", userData)
            return response.data
        } catch (error) {
            console.error("User profile update error:", error.response?.data || error.message)
        }
    }
}