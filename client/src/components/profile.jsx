import FeedItem from "./feedItem";
import Stack from "./stack";
import Navbar from "./navbar";
import login from "../images/loginImage.jpg";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import initials from "../helpers/initials";

export default function Profile(props) {
  const { suId } = useParams();
  console.log(suId);
  const [user, setUser] = useState({});
  const [userInitials, setUserInitials] = useState();
  const [blog, setBlog] = useState([]);

  async function getUser() {
    await axios.get(`http://localhost:4000/${suId}`).then((res) => {
      console.log(res.data);
      if (res.data != null) {
        setUser(res.data);
        setUserInitials(initials(res.data.username));
      }
    });
  }

  async function getBlog() {
    await axios.get(`http://localhost:4000/blogs/id/${suId}`).then((res) => {
      console.log(res.data);
      if (res.data != null) {
        setBlog(res.data);
      }
    });
  }

  useEffect(() => {
    getUser();
    getBlog();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-neutral-100 ">
        <div className="flex flex-col bg-white xl:w-152 lg:w-132 w-full  my-2 shadow-lg rounded-lg ">
          <div className="h-56 overflow-hidden flex flex-row items-center justify-center rounded-t-lg">
            <img src={login} className="h-full w-full " />
          </div>
          <div className="flex flex-row items-center w-full p-10 ">
            <div className="flex flex-row items-center justify-center rounded-full bg-indigo-600 text-2xl text-white w-24 h-24">
              {userInitials}
            </div>
            <div className="flex flex-col text-black mx-4">
              <div className="text-xl font-bold">{user.username}</div>
              <div className="text-lg text-gray-600">{user.email}</div>
              <div className="text-lg text-gray-600">issat sousse</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-around pb-2">
            <div className="text-white bg-indigo-600 px-4 py-3 rounded-lg cursor-pointer hover:bg-indigo-500 ease-in-out duration-300">
              Send invitation
            </div>
            <div className="text-white bg-indigo-600 px-4 py-3 rounded-lg cursor-pointer hover:bg-indigo-500 ease-in-out duration-300">
              Friends
            </div>
          </div> 
        </div>
        <div className="xl:w-152 lg:w-132 w-full" >
          {blog.map((blog) => {
            return (
              <FeedItem
                title={blog.title}
                description={blog.content}
                image={blog.image}
                topics={blog.topics}
                id={blog.id}
                writerId={blog.writerId}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
