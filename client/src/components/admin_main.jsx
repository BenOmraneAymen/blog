import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import Navbar from "./navbar";
import Stack from "./stack";
import FeedItem from "./feedItem";

export default function Admin_main(props) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [postStats, setPostStats] = useState([]);
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between bg-neutral-50 ">
        <Stack className="flex-none 2xl:w-112 xl:w-104 md:w-100 sm:w-56 pr-10">
          <Link to="/admin/newUsers">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              <span>New Users</span>
            </div>
          </Link>
          <Link to="/admin/allUsers">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              All Users
            </div>
          </Link>
          <Link to="/admin/userStatistics">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg ">
              User Statistics
            </div>
          </Link>
          <Link to="/admin/newPosts">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              New Posts
            </div>
          </Link>
          <Link to="/admin/allPosts">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg ">
              All Posts
            </div>
          </Link>
          <Link to="/admin/postStatistics">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              Post Statistics
            </div>
          </Link>
        </Stack>
        <FeedItem/>
      </div>
    </>
  );
}
