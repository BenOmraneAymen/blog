import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {Bar} from 'react-chartjs-2';

import Navbar from "./navbar";
import Stack from "./stack";

export default function Admin_main(props) {
  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between bg-neutral-50 ">
        <Stack className="flex-none 2xl:w-112 xl:w-104 md:w-100 sm:w-56 pr-10">
          <Link to="newUsers">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              <span>New Users</span>
            </div>
          </Link>
          <Link to="/allUsers">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              All Users
            </div>
          </Link>
          <Link to="/userStatistics">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg ">
              User Statistics
            </div>
          </Link>
          <Link to="/newPosts">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              New Posts
            </div>
          </Link>
          <Link to="/allPosts">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg ">
              All Posts
            </div>
          </Link>
          <Link to="postStatistics">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              Post Statistics
            </div>
          </Link>
        </Stack>
      </div>
    </>
  );
}
