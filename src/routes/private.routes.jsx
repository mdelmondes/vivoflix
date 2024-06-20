import { Route, Routes } from "react-router-dom"
import React, { useContext } from 'react';
import Navbar from "../components/Navbar";
import { AuthContext } from '../contexts/Auth/AuthContext';
import Home from "../components/Home";
import Movie from "../components/Movie";
import Search from "../components/Search";
import Error from "../components/Error";

const PrivateRoutes = () => {
    const user = useContext(AuthContext)
    
    return (
        <div className="App">
            {user && <Navbar/>}
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/movie/:id" element={<Movie/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/404" element={<Error/>} />
                <Route path="*" element={<Error/>} />
            </Routes>
        </div>
    )
}

export default PrivateRoutes