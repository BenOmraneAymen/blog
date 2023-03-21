import  axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate} from 'react-router'



export default function AdminRoute({children}){   

    const [auth,setAuth] = useState(true)
    
    let jwt = localStorage.getItem("token")
    
    async function verify(){
        await axios.get(`http://localhost:4000/adminValid`,{ headers: {'Authorization': `Bearer ${jwt}`}}).then((res=>{
            setAuth(res.data.validation)
        }))
    } 
    useEffect(()=>{
        verify()
    })

return auth ? children : <Navigate to='/'/>
}