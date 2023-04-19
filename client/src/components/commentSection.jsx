import { useState, useEffect } from "react";
import axios from "axios";
import CommentItem from "./commentItem";
import initials from "../helpers/initials";

export default function CommentSection(props) {
  const [comments, setComments] = useState([]);

  async function getComments() {
    await axios.get(`http://localhost:4000/comment/${props.id}`).then((res) => {
      setComments(res.data);
    });
  }

  console.log(comments);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div
      className={`${
        props.active ? "fixed" : "hidden"
      } inset-0 bg-opacity-30 bg-black flex justify-center items-center`}
    >
      <div className="2xl:w-132 md:w-112 w-100 lg:h-3/4 h-1/2 flex flex-col justify-around items-center bg-white rounded-lg">
        <div className="w-full flex items-center justify-between ">
          <div className="w-1 h-1 bg-white"></div>
          <div className="text-3xl my-4">Comments</div>
          <div
            className="flex justify-center items-center m-2 h-12 w-12  bg-neutral-300 hover:bg-red-600 text-black rounded-full"
            onClick={() => props.setActive(false)}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-108 h-3/4 overflow-y-auto">
          {comments.map((comment) => {
            return (
              <CommentItem
                key={comment._id}
                writer={comment.writerId}
                content={comment.content}
              />
            );
          })}
        </div>
        <div className="flex justify-around items-center">
          <div className={`w-12 h-12 rounded-full bg-slate-700 text-white  flex items-center justify-center`}>
            <span>{initials(localStorage.getItem("username"))}</span>
          </div>
          <input type="text" className="w-108 p-2 m-2 border-2 border-gray-300 rounded-md" />
          <span className="material-icons text-indigo-600 text-4xl">
            send
          </span>
        </div>
      </div>
    </div>
  );
}
