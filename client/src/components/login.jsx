import * as React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handelSubmit = async (e) => {
    axios.defaults.withCredentials = true;
    await axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        localStorage.setItem("id", res.data._id);
        if (res.data.isAdmin) {
          navigate("/Admin/allUsers");
        } else {
          navigate("/nav/All");
        }
      })
      .catch(
        (err) => {
          console.log("err", err);
          if (err.response.status === 400) {
            alert("Wrong password");
          }
          if (err.response.status === 401) {
            alert("user is suspended");
          }
          if (err.response.status === 404) {
            alert("Wrong password or email");
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
  };
  return (
    <>
      <div className="flex flex-row justify-center items-center h-screen bg-background ">
        <div className="hidden bg-indigo-700 w-100 xl:w-116 h-116 md:flex flex-row justify-center items-center rounded-l-md">
          <img src={logo} className="w-36" />
        </div>
        <div className="flex flex-col justify-center items-center bg-white rounded-r-lg p-8 xl:w-116 lg:104 h-116 w-100 ">
          <h1 className="text-black text-2xl m-6 self-center">
            Sign in to your account
          </h1>
          <div className="flex flex-col justify-center items-center mt-4">
            <h2 className="m-2 self-start">Email</h2>
            <input
              type="text"
              className="w-96 h-10 border-2 border-gray-400 rounded-md m-2"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h2 className="m-2 self-start ">Password</h2>
            <input
              type="password"
              className="w-96 h-10 border-2 border-gray-400 rounded-md m-2 "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="w-28 h-10 bg-indigo-700 rounded-md text-white m-2 "
              onClick={() => handelSubmit()}
            >
              Sign in
            </button>
          </div>
          <div>
            <p className="text-sm">
              <span className="text-slate-500 font-light">Don't have an account?</span>{" "}
              <Link to={"/signup"} className="text-indigo-500">
                Sign up
              </Link>
            </p>
            <p className="text-sm">
            <span className="text-slate-500 font-light">Forgot your password?</span>{" "}
              <Link to={"/forgot"} className="text-indigo-500">
                Reset password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
