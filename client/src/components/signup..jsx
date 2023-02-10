import * as React from "react"
import logo from "../images/logo.png"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const[Username,setUsername] = React.useState("")
    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")

    const handelSubmit = (e) => {
        axios.post("http://localhost:4000/signUp",{
            username:Username,
            email:email,
            password:password
    }).then((res) => {
        console.log(res.data)
        alert(res.data)
    }).catch((err) => {
        console.log(err)
    }
    )}
return(
    <>
    <div className="flex flex-row justify-center items-center h-screen bg-background ">
        <div className="hidden bg-indigo-700 w-100 xl:w-116 h-116 md:flex flex-row justify-center items-center rounded-l-md"  >
            <img src={logo}  className="w-36" />
        </div>
        <div className="flex flex-col justify-center items-center bg-white rounded-r-lg p-8 xl:w-116 lg:104 h-116 w-100 ">
            <h1 className="text-black text-2xl m-6 self-center" >Enter your information</h1>
            <div className="flex flex-col justify-center items-center mt-4">
            <h2 className="m-2 self-start">Username</h2>
            <input type="text" className="w-96 h-10 border-2 border-gray-400 rounded-md m-2" onChange={(e)=>{setUsername(e.target.value)}}/>
            <h2 className="m-2 self-start">Email</h2>
            <input type="text" className="w-96 h-10 border-2 border-gray-400 rounded-md m-2" onChange={(e)=>{setEmail(e.target.value)}}/>
            <h2 className="m-2 self-start " >Password</h2>
            <input type="password" className="w-96 h-10 border-2 border-gray-400 rounded-md m-2 " onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit" className="w-28 h-10 bg-indigo-700 rounded-md text-white mt-5 mb-2" onClick={()=>handelSubmit()} >Sign up</button>
            </div>
            <p>already have an account? <Link to={"/"}>Sign in</Link></p>
        </div>
    </div>
    </>
)
}