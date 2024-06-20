import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"
import Movie from "../components/Movie";

const PublicRoutes = () => {
    return (    
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}

export default PublicRoutes