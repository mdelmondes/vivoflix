import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './../../contexts/Auth/AuthContext';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import "./index.css"

const Navbar = () => {
    const {setAuth, auth} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {
        //await auth.signout()
        setAuth(false)
        navigate('/')
    }

    return (
        <header className="header">
            <a href='#' className="logo">VivoFlix</a>
            <nav className="navbar">                
                <form>
                    <input type="text" placeholder='Procure por um filme' />
                    <button type="submit"><BiSearchAlt2/></button>
                </form>
                {auth && <a href="/login" onClick={handleLogout}>Sair</a>}
            </nav>
        </header>
    )
}

export default Navbar