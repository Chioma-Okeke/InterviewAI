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

    async getModules(page, itemsPerPage, token, stageId) {
        try {
            const response = await apiClient.get("/modules", {
                params: {
                    page: page,
                    limit: itemsPerPage,
                    stageNumber: stageId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data.learningModules;
        } catch (error) {
            console.error(
                "Fetching Modules error:",
                error.response?.data?.msg ||
                    "Something went wrong when fetching data"
            );
            throw error;
        }
    }

    async getUserModule (userId, token) {
        try {
            const response = await apiClient.get("", {
                params: {
                    userId: userId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.data.learningModules
        } catch(error) {
            console.error("Fetching Modules error:", error.response?.data?.msg || "Something went wrong when fetching data.")
            throw error
        }
    }

    async generateQuiz(quizId, token) {
        try {
            const response = await apiClient.get(`/quizzes/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.data
        } catch (error) {
            console.error("Fetching Quiz error:", error.response?.data?.msg || "Something went wrong when fetching quiz data.")
        }
    }

    async getUserQuizHistory (userId, token) {
        try {
            const response = await apiClient.get("", {
                params: {
                    userId: userId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.data.quizzes

        } catch(error) {
            console.error("Fetching quiz history error:", error.response?.data?.msg || "Something went wrong when fetching quiz history.")
            throw error
        }
    }

    async addModuleToUserProfile(moduleData, token) {
        try {
            const response = await apiClient.post("/users/learning-modules", moduleData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response, "in service")
            return response
        } catch (error) {
            console.error("Adding Module to Profile error:", error.response?.data?.msg || "Something went wrong when adding module to profile.")
        }
    }

    async getIndividualModule(moduleId, partNumber, totalParts, token) {
        try {
            const response = await apiClient.get(`/modules/${moduleId}/parts/${partNumber}`, {
                params: {
                    totalParts: totalParts
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.data.part
        } catch (error) {
            console.error("Fetching Module error:", error.response?.data?.msg || "Something went wrong when fetching module.")
            throw error
        }
    }
}
