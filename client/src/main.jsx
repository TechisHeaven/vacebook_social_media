import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DispatchContext,
  StateContext,
  initialFriendState,
  initialPostState,
  initialUserState,
  rootReducer,
} from "./state.js";

const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(rootReducer, {
    posts: initialPostState,
    user: initialUserState,
    friendRequests: initialFriendState
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
);
