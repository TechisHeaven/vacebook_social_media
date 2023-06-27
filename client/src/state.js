import { createContext, useContext } from "react";

// Define the initial state for posts
export const initialPostState = {
  posts: [],
  loading: false,
  error: null,
};

export const initialUserState = {
  user: null,
  loading: false,
  error: null,
};

// Define initial state
export const initialFriendState = {
  friendRequests: [],
  loading: false,
  error: null,
};

// Define the post reducer function
export function postReducer(state = initialPostState, action) {
  switch (action.type) {
    case "RESET_POSTS":
      return {
        ...state,
        posts: [],
      };
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload],
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case "REMOVE_POST":
      const postIdToRemove = action.payload;
      const updatedPosts = state.posts.filter(
        (post) => post._id !== postIdToRemove
      );
      return {
        ...state,
        loading: false,
        posts: updatedPosts,
      };
    case "UPDATE_LIKE":
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      if (postIndex !== -1) {
        return {
          ...state,
          posts: [
            ...state.posts.slice(0, postIndex),
            action.payload.data[0],
            ...state.posts.slice(postIndex + 1),
          ],
        };
      } else {
        return state;
      }
    case "UPDATE_COMMENT":
      const postCommentIndex = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      if (postCommentIndex !== -1) {
        return {
          ...state,
          posts: [
            ...state.posts.slice(0, postCommentIndex),
            action.payload.data,
            ...state.posts.slice(postCommentIndex + 1),
          ],
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}

//Define the user reducer function
export function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case "LOGIN_RESET":
      return {
        ...state,
        loading: false,
        user: null,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return initialUserState;

    case "UPDATE_USER":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
}

export function friendRequestReducer(state = initialFriendState, action) {
  switch (action.type) {
    case "FETCH_FRIEND_REQUESTS_RESET":
      return {
        ...state,
        loading: false,
        friendRequests: [],
      };
    case "FETCH_FRIEND_REQUESTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_FRIEND_REQUESTS_SUCCESS":
      return {
        ...state,
        loading: false,
        friendRequests: action.payload,
      };
    case "FETCH_FRIEND_REQUESTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Combine the reducers into a single reducer function
export function rootReducer(state, action) {
  return {
    posts: postReducer(state.posts, action),
    user: userReducer(state.user, action),
    friendRequests: friendRequestReducer(state.friendRequests, action),
  };
}

// Create context objects for the state and dispatch function
export const StateContext = createContext();
export const DispatchContext = createContext();

// Define custom hooks to access the state and dispatch function from context
export function useStateContext() {
  return useContext(StateContext);
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}
