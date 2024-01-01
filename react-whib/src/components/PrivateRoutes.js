import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/AuthContext";

export default function PrivateRoutes(){
    const {token, isLoading} = useContext(UserContext)
    
    if(isLoading){
        console.log('loading')
        return(
            <h1>Loading</h1>
        )
    }else{
        return(
            (token != 'null' && token!= null) ? <Outlet /> : <Navigate to="../login" replace={true} />
        )
    }

}