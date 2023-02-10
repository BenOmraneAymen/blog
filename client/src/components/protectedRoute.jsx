import  axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate} from 'react-router'



export default function ProtectedRoute({children}){   

    const [auth,setAuth] = useState(true)
    
    let jwt = localStorage.getItem("token")
    
    async function verify(){
        await axios.get("http://localhost:4000/validation",{ headers: {'Authorization': `Bearer ${jwt}`}}).then((res=>{
            setAuth(res.data.validation)
            return res.data.validation
        }))
    } 

    verify()

    const authCheck = setInterval(()=>{
        if(auth==true)
        {
            jwt = localStorage.getItem("token")
            verify()
        } 
    },25000)

    useEffect(()=>{
        if(auth===false){
            clearInterval(authCheck)
        }
    },[auth])
    
return auth ? children : <Navigate to='/'/>
}