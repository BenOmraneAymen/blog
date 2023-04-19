import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import initials from "../helpers/initials";

export default function CommentItem(props) {
    
    const [user, setUser] = useState({});
    const [userInitials, setUserInitials] = useState();

    async function getUser(){
        await axios.get(`http://localhost:4000/${props.writer}`).then((res) => {
            console.log(res.data);
            if (res.data != null) {
              setUser(res.data);
              setUserInitials(initials(res.data.username));
            }
          });
    }

    useEffect(() => {
        getUser();
    },[])

  return (
    <div>
      <div className="flex flex-row items-center mt-1 mb-3">
        <div
          className={`w-12 h-12 rounded-full bg-slate-700 text-white  flex items-center justify-center`}
        >
          <span>{userInitials}</span>
        </div>
        <div className="w-5/6 mx-3 p-2 text-sm md:text-md lg:text-lg font-medium rounded-md bg-neutral-100 dark:bg-slate-500 dark:text-gray-100">
          <div className="text-gray-600">{user.username}</div>
          {props.content}
        </div>
      </div>
    </div>
  );
}
