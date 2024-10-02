import apiClient from "../serviceClients/apiClient";

export class UserServices {
    async updateUserProfile(userData, token) {
        try {
            const response = await apiClient.patch("/users/update", userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error(
                "User profile update error:",
                error.response?.data?.msg ||
                    "User profile update was unsuccessful"
            );
        }
    }

    async getModules(token, stageId) {
        try {
            const response = await apiClient.get("/modules", {
                params: {
                    stageNumber: stageId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json",
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

    async getUserModule(userId, token) {
        try {
            const response = await apiClient.get("", {
                params: {
                    userId: userId,
                },
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data.learningModules;
        } catch (error) {
            console.error(
                "Fetching Modules error:",
                error.response?.data?.msg ||
                    "Something went wrong when fetching data."
            );
            throw error;
        }
    }

    async generateQuiz(quizId, token) {
        try {
            const response = await apiClient.get(`/quizzes/${quizId}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data;
        } catch (error) {
            console.error(
                "Fetching Quiz error:",
                error.response?.data?.msg ||
                    "Something went wrong when fetching quiz data."
            );
        }
    }

    async getUserQuizHistory(userId, token) {
        try {
            const response = await apiClient.get("", {
                params: {
                    userId: userId,
                },
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.data.quizzes;
        } catch (error) {
            console.error(
                "Fetching quiz history error:",
                error.response?.data?.msg ||
                    "Something went wrong when fetching quiz history."
            );
            throw error;
        }
    }

    async addModuleToUserProfile(moduleData, token) {
        try {
            const response = await apiClient.post(
                "/users/learning-modules",
                moduleData,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error(
                "Adding Module to Profile error:",
                error.response?.data?.msg ||
                    "Something went wrong when adding module to profile."
            );
        }
    }

    async getIndividualModule(moduleId, partNumber, totalParts, token) {
        try {
            const response = await apiClient.get(
                `/modules/${moduleId}/parts/${partNumber}`,
                {
                    params: {
                        totalParts: totalParts,
                    },
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data.part;
        } catch (error) {
            console.error(
                "Fetching Module error:",
                error.response?.data?.msg ||
                    "Something went wrong when fetching module."
            );
            throw error;
        }
    }

    async createJobProfile(moduleData, token) {
        try {
            const response = await apiClient.post("/job-profiles", moduleData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                "Something went wrong when adding module to profile.";
            console.error("Adding Module to Profile error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    async getJobProfiles(token) {
        try {
            const response = await apiClient.get("/job-profiles", {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data.userJobProfiles;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                "Something went wrong when adding module to profile.";
            console.error("Getting Profiles error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    async deleteJobProfile(profileId, token) {
        try {
            const response = await apiClient.delete(
                `/job-profiles/${profileId}`,
                {
                    headers: {
                        // "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                "Something went wrong when adding module to profile.";
            console.error("Deleting Profile error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    async generateDescriptions(profileData, token) {
        try {
            const response = await apiClient.post("/jobDescription/generate", profileData, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                "Something went wrong when when fetching Descriptions.";
            console.error("Getting Description error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    async markPartAsCompleted (partDetails, token) {
        try {
            const response = await apiClient.post("/markLearningModulePartAsComplete", partDetails, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            const errorMessage =
                error.response?.data?.msg ||
                "Something went wrong when when marking parts.";
            console.error("Part Completed error:", errorMessage);
            throw new Error(errorMessage);
        }
    }
}
