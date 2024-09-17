/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { refreshAccessToken } from "../utils/authUtils";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const storedData = JSON.parse(localStorage.getItem("user_data"));

    useEffect(() => {
        if (storedData) {
            const { userToken, user } = storedData;
            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
        }
    }, [storedData]);

    useEffect(() => {
        if (token) {
            const refreshTimeout = setTimeout(() => {
                refreshAccessToken(setToken, logout)
            }, 13*60*1000)

            return () => clearTimeout(refreshTimeout)
        }
    }, [token])

    function login(newToken, refreshToken, newData) {
        localStorage.setItem(
            "user_date",
            JSON.stringify({
                userToken: newToken,
                refreshToken: refreshToken,
                user: newData,
            })
        );

        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
        console.log(isAuthenticated)
    }

    function logout() {
        localStorage.removeItem("user_data");
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated, login, logout, userData, setToken }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// export function useAuth() {
//     useContext(AuthContext);
// }
