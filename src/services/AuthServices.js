export class UserAuthentication {
    constructor(httpClient) {
        this.httpClient = httpClient
        this.baseUrl = import.meta.env.VITE_AUTH_BASE_URL
    }

    async signUp(userData, options = {}) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}/signup`, userData, options)
            if(!response.ok) {
                throw new Error(`Signup failed: ${response.statusText}`)
            }
            return response.json()
        } catch (error) {
            console.error('Signup error', error.message)
            throw error
        }
    }

    async login(userData, options = {}) {
        try {
            const response = await this.httpClient.post(`${this.baseUrl}/signin`, userData, options)
            if(!response.ok) {
                throw new Error(`Login failed: ${response.statusText}`)
            }
            return response.json()
        } catch (error) {
            console.error('Login error', error.message)
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
                throw new Error(`Login failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Logout error', error.message)
            throw error
        }
    }
}