import React, {useContext} from 'react'
import { Outlet } from "react-router-dom";
import { AuthContext } from './contexts/Auth/AuthContext';

import "./App.css";
import PublicRoutes from './routes/public.routes';
import PrivateRoutes from './routes/private.routes';

function App() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return user ? <PrivateRoutes/> : <PublicRoutes/>
}

export default App;