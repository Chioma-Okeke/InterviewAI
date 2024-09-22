import apiClient from "../serviceClients/apiClient";

export class UserServices {
    async updateUserProfile(userData) {
        try {
            const response = await apiClient.patch("/users/update", userData);
            return response.data;
        } catch (error) {
            console.error(
                "User profile update error:",
                error.response?.data?.msg ||
                    "User profile update was unsuccessful"
            );
        }
    }

    async getModules(page, itemsPerPage, token) {
        try {
            const response = await apiClient.get("/modules", {
                params: {
                    page: page,
                    limit: itemsPerPage,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.items;
        } catch (error) {
            console.error(
                "Fetching Modules error:",
                error.response?.data?.msg ||
                    "Something went wrong when fetching data"
            );
            throw error;
        }
    }
}
