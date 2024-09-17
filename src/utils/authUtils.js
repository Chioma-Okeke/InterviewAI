 import FetchClient from "../serviceClients/FetchClient";
 import { UserAuthentication } from "../services/AuthServices";


export async function refreshAccessToken(setToken, logout) {
    const storedData = JSON.parse(localStorage.getItem("user_data"));
    const refreshToken = storedData?.refreshToken;

    if (refreshToken) {
        const userAuthService = new UserAuthentication(FetchClient);
        try {
            const response = await userAuthService.refreshAuthToken(
                refreshToken
            );
            const data = response;
            const { access_token } = data;
            setToken(access_token);
            localStorage.setItem(
                "user_date",
                JSON.stringify({ ...storedData, userToken: access_token })
            );
            return access_token;
        } catch (error) {
            console.error("Error refreshing Token", error)
            logout();
        }
    } else {
        logout()
    }
}