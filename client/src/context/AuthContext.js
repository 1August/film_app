import {createContext} from "react"

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: (token, userId) => {
        this.token = token
        this.userId = userId
        this.isAuthenticated = true
    },
    logout: () => {
        this.token = null
        this.userId = null
        this.isAuthenticated = false
    },
    isAuthenticated: false
})