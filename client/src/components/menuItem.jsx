import { Link } from "react-router-dom";

export default function MenuItem(props) {
  return (
    <Link to={`/nav/${props.name}`}>
      <div className="flex flex-row items-center  md:text-lg sm:text-md text-md h-10 text-indigo-600 hover:text-white hover:bg-indigo-700 md:p-6 p-2 my-2 rounded-md cursor-pointer ">
        <i
          className={`devicon-${props.name.toLowerCase()}-plain px-2 text-3xl`}
        ></i>
        <span className="hidden lg:block">{props.name}</span>
      </div>
    </Link>
  );
}
