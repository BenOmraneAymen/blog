import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Stack from "./stack";
import FeedItem from "./feedItem";
import AdminRoute from "./AdminRoute";

export default function Admin_main(props) {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [blogs, setblogs] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [blogstats, setblogstats] = useState([]);


  const getData = async () => {
    switch (id) {
      case "allUsers":
        await axios.get("http://localhost:4000/").then((res) => {
          setUsers(res.data);
        });
        break;
      case "allblogs":
        await axios.get(`http://localhost:4000/blogs/All`).then((response) => {
          setblogs(response.data);
        });
        break;
    }
  };

  const suspendUser = async (userId) =>{
    await axios.put(`http://localhost:4000/suspend/${userId}`).then((res) => {
      /*refresh()*/
    });
  }

  const suspendButton = async (userId) =>{
    await suspendUser(userId);
    await getData();
  }

  const mainView = () => {
    switch (id) {
      case "allUsers":
        return (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">All Users</h1>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="grid grid-cols-4 justify-around w-5/6 px-4 py-5 mx-4 my-4 text-indigo-600 bg-neutral">
                <div>Username</div>
                <div>Email</div>
                <div>Status</div>
                <div className="flex flex-row justify-center">Action</div>
              </div>
              {users.map((user) => {
                return (
                  <>
                    <div className="grid grid-cols-4 justify-around w-5/6 px-4 py-5 mx-4 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
                      <div>{user.username}</div>
                      <div>{user.email}</div>
                      <div>{user.isSuspended ? "Suspended" : "Normal"}</div>
                      <div className="flex flex-row justify-around">
                        <div className="w-28 h-8 flex items-center justify-center bg-red-600 rounded-md cursor-pointer text-white shadow-md" onClick={()=>{suspendButton(user._id)}}>
                        {user.isSuspended ? "Unsuspend" : "suspend"}
                        </div>
                        <div className="w-28 h-8 flex items-center justify-center bg-green-600 rounded-md cursor-pointer text-white shadow-md">
                          view profile
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      case "allblogs":
        return (
          <div className="2xl:w-200 w-full px-5 2xl:mx-16">
            {blogs.map((blog) => {
              return (
                <FeedItem
                  title={blog.title}
                  description={blog.content}
                  image={blog.image}
                  topics={blog.topics}
                  id={blog._id}
                  writerId={blog.writerId}
                  updatedAt={blog.updatedAt}
                />
              );
            })}
          </div>
        );
        break;
    }
  };



  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
    <AdminRoute>
      <Navbar />
      <div className="flex flex-row justify-between  bg-neutral-50 ">
        <Stack className="flex-none 2xl:w-112 xl:w-104 w-56 pr-10">
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
          <Link to="/admin/allblogs">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg ">
              All blogs
            </div>
          </Link>
          <Link to="/admin/blogstatistics">
            <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
              blog Statistics
            </div>
          </Link>
        </Stack>
        <div className="w-full flex flex-col items-center">{mainView()}</div>
      </div>
    </AdminRoute>
    </>
  );
}
