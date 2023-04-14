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
  const [topics, setTopics] = useState([]);
  const [blogstats, setblogstats] = useState([]);
  const [vis ,setVis] = useState(false);
  const [iconName,setIconName] = useState("")
  const [Name,setName] = useState("")



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
      case "topics":
        await axios.get(`http://localhost:4000/topic/All`).then((response) => {
          setTopics(response.data);
          console.log(response.data)
        });
    }
  };

  const suspendUser = async (userId) => {
    await axios.put(`http://localhost:4000/suspend/${userId}`).then((res) => {
      /*refresh()*/
    });
  };

  const addTopic = async () =>{
    console.log(iconName);
    console.log(Name)
    if(iconName =="" || Name ==""){
      alert("There is missing argument")
    }else{
      console.log("working")
      await axios.post(`http://localhost:4000/topic/`,{iconName:iconName,name:Name}).then((res)=>{
        console.log(res)
      })
      setVis(false)
      await getData()
    }
  }

  const deleteTopic = async (id) =>{
    console.log(id);
    await axios.delete(`http://localhost:4000/topic/${id}`).then((res)=>{
      console.log(res)
    })
  }

  const suspendButton = async (userId) => {
    await suspendUser(userId);
    await getData();
  };

  const addTopicMenu = () => {
    if(vis){
      setVis(false)
    }else{
      setVis(true)
    }
  }



  const mainView = () => {
    switch (id) {
      case "allUsers":
        return (
          <div className="w-full flex flex-col justify-center items-center">
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
                    <div className="grid grid-cols-4 justify-around w-5/6 px-4 py-5 mx-4 my-1 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
                      <div>{user.username}</div>
                      <div>{user.email}</div>
                      <div>{user.isSuspended ? "Suspended" : "Normal"}</div>
                      <div className="flex flex-row justify-around">
                        <div
                          className="w-28 h-8 flex items-center justify-center bg-red-600 rounded-md cursor-pointer text-white shadow-md"
                          onClick={() => {
                            suspendButton(user._id);
                          }}
                        >
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
      case "topics":
        return (
          <div className="w-full flex flex-col items-center my-2">
            <div className="bg-green-600 text-white w-24 h-10 flex items-center justify-center rounded-lg self-end mx-4 cursor-pointer" onClick={()=>{addTopicMenu()}}>
              add Topic
            </div>
            <form className={`w-5/6 ${vis?'flex':'hidden'} flex-col align-center border-gray-300 border-2 rounded-lg py-2`}>
              <div className="flex flex-row items-center justify-around">
                <div className="flex flex-col">
                  <label>Icon Name</label>
                  <input
                    type="text"
                    name="iconName"
                    id="iconName"
                    className="border-gray-300 border-2 rounded-md"
                    required
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Name</label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    className="border-gray-300 border-2 rounded-md"
                    required
                    onChange={(e)=>{setIconName(e.target.value)}}
                  />
                </div>
              </div>
              <div className="bg-green-600 text-white w-24 h-10 flex items-center justify-center rounded-lg self-center mx-4 my-2" onClick={()=>addTopic()}>
                add Topic
              </div>
            </form>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="grid grid-cols-3 justify-around w-5/6 px-4 py-5 mx-4 my-4 text-indigo-600 bg-neutral">
                <div>Icon</div>
                <div>Topic</div>
                <div className="flex flex-row justify-center">Action</div>
              </div>
              {topics.map((menu) => {
                return (
                  <>
                    <div className="grid grid-cols-3 justify-around w-5/6 px-4 py-4 mx-4 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
                      <i
                        className={`devicon-${menu.iconName.toLowerCase()}-plain px-2 text-3xl`}
                      ></i>
                      <div>{menu.name}</div>
                      <div className="flex flex-row justify-center">
                        <div className="w-28 h-8 mx-2 flex items-center justify-center bg-red-600 rounded-md cursor-pointer text-white shadow-md" onClick={()=>deleteTopic(menu._id)}>
                          delete
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
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
            <Link to="/admin/allblogs">
              <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg ">
                All blogs
              </div>
            </Link>
            <Link to="/admin/blogstatistics">
              <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
                Blog Statistics
              </div>
            </Link>
            <Link to="/admin/topics">
              <div className="w-36 px-4 py-5 my-4 text-indigo-600 bg-neutral  hover:bg-indigo-600 hover:text-white rounded-lg">
                Topics
              </div>
            </Link>
          </Stack>
          <div className="w-full flex flex-col items-center">{mainView()}</div>
        </div>
      </AdminRoute>
    </>
  );
}
