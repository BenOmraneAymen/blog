import img from "../images/loginImage.jpg";
import axios from "axios";
import { useState, useEffect,useContext } from "react";
import initials from "../helpers/initials";
import { Link } from "react-router-dom";
import { bgColorContext } from "../App";

export default function FeedItem(props) {
  const imgVisible = props.image ? true : false;
  const serverUrl = "http://localhost:4000";

  const [user, setUser] = useState({});
  const [userInitials, setUserInitials] = useState();
  const [likeNumber, setLikeNumber] = useState(0);

  console.log(props.id);
  async function getLike() {
    await axios.get(`http://localhost:4000/like/${props._id}`).then((res) => {
      setLikeNumber(res.data.length);
    });
  }

  async function setLike() {
    alert("like");
    console.log(props.id);
    await axios
      .post(`http://localhost:4000/like/`, {
        postId: props.id,
        writerId: localStorage.getItem("id"),
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  async function getUser() {
    await axios.get(`http://localhost:4000/${props.writerId}`).then((res) => {
      console.log(res.data);
      if (res.data != null) {
        setUser(res.data);
        setUserInitials(initials(res.data.username));
      }
    });
  }

  function getUpdatedDate() {
    const date = new Date(props?.updatedAt);
    const updatedDate = date.toDateString();
    return updatedDate;
  }

  useEffect(() => {
    getUser();
    getLike();
  }, []);

  return (
    <div className={`flex flex-col justify-between align-center p-4 my-2 shadow-lg rounded-md bg-white dark:bg-slate-900`} >
      <Link to={`/profile/${props.writerId}`}>
        <div className="flex flex-row items-center mt-1 mb-3">
          {/* <img src={require("../images/loginImage.jpg")} className="w-12 h-12 rounded-full" /> */}
          <div className={`w-12 h-12 rounded-full bg-slate-700 text-white  flex items-center justify-center`}>
            <span>{userInitials}</span>
          </div>
          <div className="flex flex-col px-3">
            <div className="text-sm md:text-md lg:text-lg font-semibold dark:text-gray-100">
              {user.username}
            </div>
            <div className="text-xs md:text-sm md:text-md text-gray-500">
              {getUpdatedDate(props?.updatedAt)}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-row items-center">
        {props.topics.map((topic) => {
          return (
            <div className="flex flex-row items-center px-2 py-1 mx-1 my-1 text-xs md:text-sm lg:text-md text-gray-500 bg-gray-200 dark:text-gray-200 dark:bg-gray-500 rounded-full cursor-pointer">
              {topic}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-center my-4 ">
        <div className="flex flex-col">
          <div className="text-sm md:text-md lg:text-xl font-semibold dark:text-gray-300">
            {props.title}
          </div>
          <div className="text-xs md:text-sm lg:text-lg text-gray-500 my-2 w-full">
            {props.description}
          </div>
        </div>
      </div>
      <img
        src={imgVisible ? serverUrl + "/" + props.image : img}
        className={`${
          imgVisible ? "block" : "hidden"
        } w-full rounded-sm mx-auto`}
      />
      <div className="flex flex-row justify-between align-center px-4 py-1 mt-3 dark:text-gray-300">
        <div
          className="flex flex-row align-center justify-center w-24 h-10 cursor-pointer "
          onClick={() => setLike()}
        >
          <div className="flex flex-row align-center justify-around w-16 h-8 cursor-pointer">
            <span class="material-icons">thumb_up</span>
            <span>Like</span>
          </div>
        </div>
        <div className="flex flex-row align-center justify-around w-16 h-8 cursor-pointer">
          <span class="material-icons">chat_bubble</span>
          <span>Comment</span>
        </div>
        <div className="flex flex-row align-center justify-around w-16 h-8 cursor-pointer">
          <span class="material-icons">reply</span>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
}
