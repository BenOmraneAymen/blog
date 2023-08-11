import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import initials from "../helpers/initials";
import { themeContext } from "../App";

export default function DropDownMenu() {
  const [active, setActive] = useState(true);

  const theme = useContext(themeContext);
  console.log(theme);

  const activate = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            onClick={() => {
              activate();
            }}
          >
            {
              <div
                className={`${
                  active ? "bg-indigo-500" : "bg-indigo-400"
                } rounded-lg w-52 md:w-64 h-16 flex flex-row items-center mx-2 shadow-lg`}
              >
                <div className="rounded-full bg-indigo-200 w-8 h-8  md:w-12 md:h-12 flex flex-row items-center justify-center m-1 md:text-lg  text-xs">
                  {initials(localStorage.getItem("username"))}
                </div>
                <div className="flex flex-col items-start m-1">
                  <div className="text-xs md:text-sm text-white ">
                    {localStorage.getItem("username")}
                  </div>
                  <div className="text-xs md:text-sm text-white ">
                    {localStorage.getItem("email")}
                  </div>
                </div>
              </div>
            }
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 mr-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Link to={`/profile/${localStorage.getItem("id")}`}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-indigo-600 text-white "
                          : "text-gray-900 dark:text-gray-300"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <span
                        className={`material-icons text-xl mr-2 h-5 w-5 ${
                          active ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        account_circle
                      </span>
                      Profile
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Link to="/nav/All">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-indigo-600 text-white "
                          : "text-gray-900 dark:text-gray-300"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <span
                        className={`material-icons text-xl mr-2 h-5 w-5 ${
                          active ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        article
                      </span>
                      Blogs
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Link to="/upload">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-indigo-600 text-white "
                          : "text-gray-900 dark:text-gray-300"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <span
                        className={`material-icons text-xl mr-2 h-5 w-5 ${
                          active ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        upload
                      </span>
                      upload
                    </button>
                  )}
                </Menu.Item>
              </Link>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-indigo-600 text-white "
                          : "text-gray-900 dark:text-gray-300"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => theme.toggleDarkMode()}
                    >
                      <span
                        className={`material-icons text-xl mr-2 h-5 w-5 ${
                          active ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        settings
                      </span>
                      Settings
                    </button>
                  )}
                </Menu.Item>
                <Link to="/">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-indigo-600 text-white "
                          : "text-gray-900 dark:text-gray-300"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => logout()}
                    >
                      <span
                        className={`material-icons text-xl mr-2 h-5 w-5 ${
                          active ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        logout
                      </span>
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
