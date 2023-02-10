import { Link } from "react-router-dom";
import initials from "../helpers/initials"


export default function FriendContainer(props){
    const shortName = initials(props.name);

    return(
        <Link to={`/profile/${props.id}`}>
        <div className={`bg-indigo-500 hover:bg-indigo-400 rounded-lg  w-full h-16 flex flex-row items-center my-2 shadow-lg cursor-pointer`}>
        <div className="rounded-full bg-indigo-200 w-10 h-10  md:w-12 md:h-12 flex flex-row items-center justify-center m-2 ">{shortName}</div>
        <div className="flex flex-col m-2">
            <div className="text-xs md:text-sm text-white ">{props.name}</div>
            <div className="text-xs md:text-sm text-white ">{props.email}</div>
        </div>
        </div>
        </Link>
    )
}