/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import apiClient from "../serviceClients/apiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const storedData = JSON.parse(localStorage.getItem("user_data"));
    const isRefreshing = useRef(false)
    const failedQueue = useRef([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("user_data"));
        if (storedData) {
            const { userToken } = storedData;
            setToken(userToken);
            // setUserData(user);
            setIsAuthenticated(true);
        } 
        setLoading(false);
    }, []);

    useEffect(() => {
    }, [isAuthenticated]);

    // useEffect(() => {
    //     function fetchUser() {
    //         try {
    //             const response = apiClient.get('/api/me')
    //             setToken(response.data.accessToken)
    //         } catch (error) {
    //             setToken(null)
    //             console.error(error)
    //         }
    //     }

    //     fetchUser()
    // }, [])

    // useLayoutEffect(() => {
    //     const authInterceptor = apiClient.interceptors.request.use(async (config) => {
    //         try {
    //             const storedData = JSON.parse(localStorage.getItem("user_data"));
    //             const token = storedData?.accessToken;
        
    //             if (token) {
    //                 config.headers.Authorization = `Bearer ${token}`;
    //             }
        
    //             return config;
    //         } catch (error) {
    //             console.error("Error attaching token to request", error);
    //             return Promise.reject(error);
    //         }
    //     });

    //     return () => {
    //         apiClient.interceptors.request.eject(authInterceptor)
    //     }
    // }, [token])

    // useLayoutEffect(() => {
    //     const refreshInterceptor = apiClient.interceptors.response.use(
    //         (response) => response,
    //         async (error) => {
    //             const originalRequest = error.config;
    //             // const storedData = JSON.parse(
    //             //     localStorage.getItem("user_data")
    //             // );

    //             if (error.response?.status === 401 && error.response?.data.message === 'Unauthorized' && !originalRequest._retry) {
    //                 // If 401 Unauthorized and the request hasn't been retried yet
    //                 if (isRefreshing) {
    //                     return new Promise(function (resolve, reject) {
    //                         failedQueue.push({ resolve, reject });
    //                     })
    //                         .then((token) => {
    //                             originalRequest.headers.Authorization =
    //                                 "Bearer " + token;
    //                             return apiClient(originalRequest);
    //                         })
    //                         .catch((err) => {
    //                             return Promise.reject(err);
    //                         });
    //                 }

    //                 originalRequest._retry = true;
    //                 isRefreshing.current = true;

    //                 try {
    //                     const newAccessToken = await refreshAccessToken();
    //                     processQueue(null, newAccessToken); // Retry the failed requests
    //                     isRefreshing.current = false;

    //                     // Retry the original request with the new access token
    //                     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //                     return apiClient(originalRequest);
    //                 } catch (err) {
    //                     processQueue(err, null);
    //                     isRefreshing.current = false;
    //                     setToken(null)
    //                     // Handle token refresh failure (e.g., force logout)
    //                     // throw err;
    //                 }
    //             }

    //             return Promise.reject(error);
    //         }
    //     );

    //     return () => {
    //         apiClient.interceptors.response.eject(refreshInterceptor)
    //     }
    // }, []);

    // const processQueue = (error, token = null) => {
    //     failedQueue.forEach((promise) => {
    //         if (error) {
    //             promise.reject(error);
    //         } else {
    //             promise.resolve(token);
    //         }
    //     });
    //     failedQueue.current = [];
    // };

    // useEffect(() => {
    //     if (token) {
    //         const refreshTimeout = setTimeout(() => {
    //             refreshAccessToken(setToken, logout)
    //         }, 13*60*1000)

    //         return () => clearTimeout(refreshTimeout)
    //     }
    // }, [token])

    // const refreshAccessToken = async () => {
    //     const storedData = JSON.parse(localStorage.getItem("user_data"));
    //     const refreshToken = storedData?.refreshToken;

    //     if (!refreshToken) {
    //         logout();
    //         return null;
    //     }

    //     try {
    //         const response = await apiClient.post("/refresh", {
    //             refreshToken,
    //         });

    //         const { accessToken } = response.data;
    //         setToken(accessToken);
    //         localStorage.setItem(
    //             "user_data",
    //             JSON.stringify({
    //                 ...storedData,
    //                 userToken: accessToken,
    //             })
    //         );
    //         return accessToken;
    //     } catch (error) {
    //         console.error("Error refreshing access token:", error);
    //         logout();
    //         return null;
    //     }
    // };

    function login(newToken, refreshToken) {
        localStorage.setItem(
            "user_data",
            JSON.stringify({
                userToken: newToken,
                refreshToken: refreshToken,
                // user: newData,
            })
        );

        setToken(newToken);
        // setUserData(newData);
        setIsAuthenticated(true);
    }

    function logout() {
        localStorage.removeItem("user_data");
        setToken(null);
        // setUserData(null);
        setIsAuthenticated(false);
    }

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading indicator
    }

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated, login, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// export function useAuth() {
//     useContext(AuthContext);
// }
