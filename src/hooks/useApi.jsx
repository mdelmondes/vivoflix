import axios from "axios"

const api = axios.create({baseURL: 'http://localhost:3333'})

const useApi = () => ({

    validateToken: async (token) => {
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
       };
        const response = await api.post('/validateToken', null, config)
        return response.data
    },

    signin: async (email, password) => {
        const response = await api.post('/auth/login', {email, password})
        return response.data
    },

    signout: async () => {
       const response = await api.post('/logout')       
       return response.data
    },

    signup: async (email, username, password) => {
        const response = await api.post('/auth/register', {email, username, password})
        return response.data
    },

    registrar: async (movieId, userId, status, tipo) => {
        const response = await api.post('/movie/register', {movieId, userId, status, tipo})
        return response.data
    },

    getRegistro: async (movieId, userId) => {
        const response = await api.post('/movie/get', {movieId, userId})
        return response.data
    },

    getAllRegistros: async (userId) => {
        const response = await api.post('/movie/get-all', {userId})
        return response.data
    },
})

export default useApi