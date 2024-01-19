import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/utils/Header";
import Home from "./components/pages/Home/Home";
import Profile from "./components/pages/Profile";
import Friends from "./components/pages/Friends";
import Search from "./components/pages/Search";
import Login from "./components/pages/Login/index";
import { useContext, useEffect, useReducer, useState } from "react";
import {
  DispatchContext,
  StateContext,
  initialPostState,
  initialUserState,
  rootReducer,
  useDispatchContext,
  useStateContext,
} from "./state";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

function App() {
  const dispatch = useDispatchContext();
  const state = useStateContext();
  let { user } = state.user;

  useEffect(() => {
    dispatch({ type: "LOGIN_RESET" });
    if (!localStorage.getItem("user")) {
      dispatch({ type: "LOGOUT" });
      return;
    }

    dispatch({ type: "LOGIN_REQUEST" });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    fetch(`http://localhost:3000/api/user/${user._id}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  // const handleclick = () => {
  //   toast.success("Notification message", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // };

  return (
    <>
      {
        // Render loading state if login status is being checked
        state.user.loading ? (
          <div className="w-full h-full bg-white fixed z-10 flex items-center justify-center">
            <img
              src="/logo.png"
              className="w-[150px] animate-spin"
              alt="loader"
            />
          </div>
        ) : (
          <BrowserRouter>
            {user ? (
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:id" element={<Home />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/search/:id" element={<Search />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
              </Routes>
            )}
          </BrowserRouter>
        )
      }
    </>
  );
}

export default App;
