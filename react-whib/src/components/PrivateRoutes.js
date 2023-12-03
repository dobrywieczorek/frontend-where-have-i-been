import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/AuthContext";

export default function PrivateRoutes(){
    const {token} = useContext(UserContext)
    console.log('token: '+token)
    return(
        (token != 'null' && token!= null) ? <Outlet /> : <Navigate to="/login" />
    )
}