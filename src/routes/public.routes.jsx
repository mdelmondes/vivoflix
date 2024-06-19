import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../components/Login"

const PublicRoutes = () => {
    return (    
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    )
}

export default PublicRoutes