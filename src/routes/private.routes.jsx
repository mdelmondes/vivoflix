import { Route, Routes } from "react-router-dom"
import React, { useContext } from 'react';
import Login from "../components/Login"
import Navbar from "../components/Navbar";
import { AuthContext } from '../contexts/Auth/AuthContext';
import Home from "../components/Home";
import Movie from "../components/Movie";
import Search from "../components/Search";

const PrivateRoutes = () => {
    const auth = useContext(AuthContext)
    console.log(auth)
    return (
        <div className="App">
            {auth && <Navbar/>}
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/movie/:id" element={<Movie/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </div>
    )
}

export default PrivateRoutes