import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
    timeout: 10000,
});

export default apiClient;
