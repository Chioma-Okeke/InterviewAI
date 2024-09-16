export class UserAuthentication {
    constructor(httpClient) {
        this.httpClient = httpClient
        this.baseUrl = import.meta.env.VITE_AUTH_BASE_URL
    }

    async signUp(userData) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}/signup`, userData)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async login(userData) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}/signin`, userData)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async logout(token) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to log out');
            }
        } catch (error) {
            console.error('Logout failed', error)
            throw error
        }
    }
}