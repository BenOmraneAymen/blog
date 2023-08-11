import img from "../images/loginImage.jpg";
import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import initials from "../helpers/initials";
import { Link } from "react-router-dom";
import CommentSection from "./commentSection";
import { Menu, Transition } from "@headlessui/react";

export default function FeedItem(props) {
  const imgVisible = props.image ? true : false;
  const serverUrl = "http://localhost:4000";

  const [user, setUser] = useState({});
  const [userInitials, setUserInitials] = useState();
  const [likeNumber, setLikeNumber] = useState(0);
  const [likeState, setLikeState] = useState(false);
  const [commentState, setCommentState] = useState(false);

  async function getLike() {
    await axios.get(`http://localhost:4000/like/${props._id}`).then((res) => {
      setLikeNumber(res.data.length);
    });
  }

  async function checkLike() {
    await axios
      .get(
        `http://localhost:4000/like/${props._id}/${localStorage.getItem("id")}`
      )
      .then((res) => {
        if (res.data.length != 0) {
          setLikeState(true);
        }
      });
  }

  async function setLike() {
    if (likeState) {
      await axios
        .post(`http://localhost:4000/like/`, {
          postId: props.id,
          writerId: localStorage.getItem("id"),
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      await axios
        .delete(
          `http://localhost:4000/like/${props.id}/${localStorage.getItem("id")}`
        )
        .then((res) => {
          console.log(res.data);
        });
    }
  }

  async function likeFun() {
    setLikeState(!likeState);
    await setLike();
  }

  async function getUser() {
    await axios.get(`http://localhost:4000/${props.writerId}`).then((res) => {
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

  async function deletePost() {
    if (showMenuUser() || showMenuAdmin()) {
      await axios
        .delete(`http://localhost:4000/blogs/${props.id}`)
        .then((res) => {
          console.log(res);
        });
      window.location.reload(false);
    }
  }

  function showMenuUser() {
    return props.writerId === localStorage.getItem("id");
  }
  function showMenuAdmin() {
    console.log(localStorage.getItem("isAdmin") == "true");
    return localStorage.getItem("isAdmin") == "true";
  }

  useEffect(() => {
    showMenuAdmin();
    checkLike();
    getUser();
    getLike();
  }, []);

  useEffect(() => {
    getLike();
  }, [likeState]);

  return (
    <div
      className={`flex flex-col justify-between align-center m-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 `}
    >
      <div className="flex flex-row justify-between items-center mt-1 mb-3 h-20">
        <Link to={`/profile/${props.writerId}`}>
          <div className="flex flex-row items-center mt-1 mb-3">
            {/* <img src={require("../images/loginImage.jpg")} className="w-12 h-12 rounded-full" /> */}
            <div
              className={`w-12 h-12 rounded-full bg-slate-700 text-white  flex items-center justify-center`}
            >
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

        <div
          className={`${
            showMenuUser() || showMenuAdmin() ? "" : "hidden "
          }mx-14`}
        >
          <Menu>
            <Menu.Button>
              <span
                className={`material-icons text-xl mr-2 h-5 w-5 dark:text-white`}
              >
                menu
              </span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={`absolute bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="px-1 py-1 ">
                  <Menu.Item
                    className={`${
                      showMenuUser() ? "block" : "hidden"
                    } flex items-center rounded-md py-2 text-md `}
                  >
                    {({ active }) => (
                      <Link
                        to={`/upload/${props.id}`}
                        className={`${
                          active
                            ? "bg-indigo-600 text-white "
                            : "text-gray-900 dark:text-gray-300"
                        } group w-full`}
                      >
                        <span
                          className={`material-icons text-xl mr-2 h-5 w-5 ${
                            active ? "  text-indigo-400" : "text-indigo-600"
                          }`}
                        >
                          edit
                        </span>
                        <span className="dark:text-white">Edit</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    className={`${
                      showMenuUser() || showMenuAdmin() ? "block" : "hidden"
                    } flex items-center rounded-md py-2 text-md `}
                  >
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-indigo-600 text-white "
                            : "text-gray-900 dark:text-gray-300"
                        } group  w-full`}
                        onClick={() => deletePost()}
                      >
                        <span
                          className={`material-icons text-xl mr-2 h-5 w-5 ${
                            active ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        >
                          delete
                        </span>
                        <span className="dark:text-white">Delete</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
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
      <div
        className={`flex flex-row justify-between align-center px-4 py-1 mt-3 dark:text-gray-300 text-xl `}
      >
        <div
          className="flex flex-row items-center justify-center w-24 h-10 cursor-pointer "
          onClick={() => likeFun()}
        >
          <div
            className={`flex flex-row items-center justify-around w-16 h-8 cursor-pointer ${
              !likeState
                ? "text-indigo-500"
                : "text-slate-500 dark:text-gray-300"
            } `}
          >
            <span class="material-icons">thumb_up</span>
            <span>{likeNumber}</span>
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-around w-16 h-8 cursor-pointer"
          onClick={() => setCommentState(true)}
        >
          <span class="material-icons">chat_bubble</span>
          <span>Comment</span>
        </div>
        <div className="flex flex-row items-center justify-around w-16 h-8 cursor-pointer">
          <span class="material-icons">reply</span>
          <span>Share</span>
        </div>
      </div>
      <CommentSection
        id={props.id}
        active={commentState}
        setActive={setCommentState}
      />
    </div>
  );
}
