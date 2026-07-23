import React,{Children, useState} from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({children})=>{
    const {loading,user} = useAuth();

    console.log("Protected");
    console.log("loading =", loading);
    console.log("user =", user);

    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }

    return children;
}

export default Protected;