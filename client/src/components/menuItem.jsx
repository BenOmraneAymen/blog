import { Link } from "react-router-dom";

export default function MenuItem(props) {   
  return (
    <Link to={`/nav/${props.name}`}>
      <div className="flex flex-row items-center  md:text-lg sm:text-md text-md md:h-14 sm:w-40 md:my-2 my-1 h-10 text-indigo-600 hover:text-white hover:bg-indigo-700 rounded-md py-2 pl-2 md:pr-10 lg:pr-14 pr-2 cursor-pointer ">
        <i
          className={`devicon-${props.name.toLowerCase()}-plain px-2 text-3xl`}
        ></i>
        {props.name}
      </div>
    </Link>
  );
}
