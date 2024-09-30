import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    timeout: 20000,
});

//second api client (With a different baseurl)
export const thirdPartyApiClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_AXIOS_BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
    timeout: 10000
})

export default apiClient;
