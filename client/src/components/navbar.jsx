import logo from "../images/logo.png"
import DropDownMenu from "./dropDownMenu"

export default function Navbar(){
    return(
        <div className="bg-indigo-700 flex flex-row items-center justify-between h-24 w-full shadow-lg"> 
            <img src={logo} className="w-20 p-4 md:mr-16" />
            <div className="flex flex-row items-center">
                <input type="search" name="" id="" className="rounded-l-lg md:rounded-lg  p-2 md:w-72 lg:w-80 h-10 outline-0" />
                <button className="rounded-lg w-20 h-10 text-white bg-slate-400 m-4 md:inline-block hidden " >search</button>
                <div className="md:hidden block ">
                    <button className=" text-black inline-block material-icons bg-white h-10 rounded-r-lg " style={{'fontSize':'30px'}} >search</button>
                </div>
            </div>
            <DropDownMenu/>
        </div>
    )
}