import {createContext, useState, useRef, useEffect} from 'react'
import useApi from '../../hooks/useApi'

export const AuthContext = createContext()
function AuthProvider ({children}) {
    const [user, setUser] = useState(null)
    const {current: api} = useRef(useApi())

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken')            

            if(storageData){
                try {
                    const data = await api.validateToken(storageData)
                    if(data[0].email){
                        setUser(data[0])
                    }
                } catch (error) {
                    console.log(error)
                }
               
            }
        }
        validateToken()
    }, [api])

    const signin = async (email, password) => {
        const data = await api.signin(email, password)
        const token = data.token
        if (data && data.token) {
            setUser(data.user[0])
            setToken(token)
            return true
        }

        return false
    }

    const signout = async () => {
        await api.signout()
        setUser(null)
        setToken('')
    }

    const setToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const signup = async (email, username, password) => {
        const data = await api.signup(email, username, password)
        return JSON.stringify(data)
    }

    const registrar = async (movieId, userId, status, tipo) => {
        const data = await api.registrar(movieId, userId, status, tipo)
        return JSON.stringify(data)
    }

    const getRegistro = async (movieId, userId) => {
        const data = await api.getRegistro(movieId, userId)
        return JSON.stringify(data)
    }

    const getAllRegistros = async (userId) => {
        const data = await api.getAllRegistros(userId)
        return JSON.stringify(data)
    }

    return (
        <AuthContext.Provider  value={{ user, signin, signout, signup, registrar, getRegistro, getAllRegistros }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider