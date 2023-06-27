import React, { useState } from "react";
import RegisterModal from "./RegisterModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatchContext } from "../../../state";
import { toast } from "react-toastify";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useNavigate();

  const dispatch = useDispatchContext();

  const handleSubmit = (e) => {
    dispatch({ type: "LOGIN_REQUEST" });
    e.preventDefault();

    const config = {
      headers: {
        Authorization: { "Content-Type": "application/json" },
      },
      data: {
        email: email,
        password: password,
      },
    };
    axios
      .post("http://localhost:3000/api/user/login", config)
      .then((response) => {
        if (
          (response.status == 200 || statusText == "OK") &&
          response.data._id
        ) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
          toast.success(`Welcome, ${response.data.name}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

          location("/");
        }
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          dispatch({ type: "LOGIN_FAILURE" });
          setError("Invalid password or email address");
        }
      });
  };

  return (
    <>
      <div className="LoginWrapper">
        <div
          className="max-w-[980px] min-h-[640px] items-center justify-center h-full relative w-[980px] p-2 flex flex-row gap-2"
          style={{ margin: "0 auto" }}
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-[#1877f2] font-bold text-6xl">Vacebook</h1>
            <p className="font-normal text-3xl w-[500px]">
              Vacebook helps you connect and share with the people in your life.
            </p>
          </div>
          <div className="w-[396px] bg-white shadow-md rounded-md p-4 gap-4 flex flex-col">
            <form
              method="get"
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4 items-center"
            >
              <p className="text-red-600 font-semibold">{error}</p>
              <input
                className="p-2 border-2 border-gray-200 rounded-[5px] outline-blue-600/50 text-lg w-full"
                type="email"
                placeholder="Email address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-2 border-2 border-gray-200 rounded-[5px] outline-blue-600/50 text-lg w-full"
                type="password"
                required
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#1877f2] rounded-[5px] w-full p-2 text-lg font-bold text-white"
              >
                Login
              </button>
              <a href="" className="text-base text-[#1877f2]">
                Forgotten password?
              </a>
            </form>
            <hr />
            <div className="block text-center p-2">
              <button
                onClick={handleOpen}
                className="bg-[#42b72a] text-white p-2 text-lg font-bold rounded-[5px] w-[200px]"
              >
                Create new account
              </button>
              <RegisterModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
