import { useEffect, useState } from "react";
import FeedItem from "./feedItem";
import FriendContainer from "./friendContainer";
import MenuItem from "./menuItem";
import Navbar from "./navbar";
import Stack from "./stack";
import axios from "axios";
import { useParams } from "react-router";
import ProtectedRoute from "./protectedRoute";

export default function MainPage() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentuser, setCurrentuser] = useState([]);

  async function getTopics() {
    const url = "http://localhost:4000/topic/All";
    await axios.get(url).then((response) => {
      setTopics(response.data);
    });
  }
  async function getBlogs() {
    const url = `http://localhost:4000/blogs/${id}`;
    await axios.get(url).then((response) => {
      console.log(response.data)
      setBlogs(response.data);
    });
  }

  async function getCurrentUser() {
    const url = "http://localhost:4000/";
    await axios.get(url).then((response) => {
      setCurrentuser(response.data);
    });
  }

  useEffect(() => {
    getTopics();
    getCurrentUser();
  }, []);

  useEffect(() => {
    getBlogs();
  }, [id]);

  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <div className="flex flex-row justify-between bg-neutral-50 ">
          <Stack className="flex-none 2xl:w-112 xl:w-104 md:w-100 sm:w-56 pr-10">
            {topics?.map((topic) => {
              return <MenuItem name={topic.name} id={topic._id} />;
            })}
          </Stack>
          <Stack className="flex-shrink w-152">
            <>
              <div
                className={`${
                  blogs.length > 0 ? "hidden" : "block"
                } text-gray-700 text-3xl m-6`}
              >
                No blogs found
              </div>
              {blogs?.map((blog) => {
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
            </>
          </Stack>
          <div className="hidden lg:flex flex-col m-2 flex-none xl:w-54">
            <h1 className="text-3xl pt-2 text-gray-700">Friends</h1>
            {currentuser?.map((friend) => {
              return (
                <FriendContainer
                  id={friend._id}
                  name={friend.username}
                  email={friend.email}
                />
              );
            })}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
