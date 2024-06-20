import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './../../contexts/Auth/AuthContext';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import "./index.css"

const Navbar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(search)

        if(!search) return

        navigate(`/search?q=${search}`)
        setSearch('')
    }

    const goHome = () => {
        navigate('/home')
    }

    const handleLogout = async () => {
        await auth.signout()
        navigate('/')
    }

    return (
        <header className="header">
            <div className="logo" onClick={goHome} style={{cursor: 'pointer'}}>
                VivoFlix
            </div>              
            <nav className="navbar">                
                <form onSubmit={handleSubmit} className='form'>
                    <input type="text" placeholder='Procure por um filme'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button type="submit"><BiSearchAlt2/></button>
                </form>
                {auth && <a href="/login" onClick={handleLogout} >Sair</a>}
            </nav>            
        </header>
    )
}

export default Navbar