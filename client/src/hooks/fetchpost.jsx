import { useState, useEffect, useReducer } from "react";
import { initialPostState, postReducer, useDispatchContext, useStateContext } from "../state";

function useFetch(url, options, page=0, refresh, isLiked) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState([]);

  const dispatch = useDispatchContext();
  //post fetch request------------------------

  const fetchData = async () => {

    try {
      dispatch({ type: 'FETCH_POSTS_REQUEST' });
      // post fetch
      const data = await fetch(
        `http://localhost:3000/api/post?page=${page}`,
        options
      ).then((res) => res.json());


      for (let i = 0; i < data.length; i++) {
        // postedUserData fetch here
        let PostedUserId = await data[i].PostUserID;

        const PostedUserData = await fetch(
          `http://localhost:3000/api/user/${PostedUserId}`,
          options
        ).then((res) => res.json());

        data[i].PostUserName = PostedUserData.user.name;
        data[i].PostUserImg = PostedUserData.user.pic;

        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.parse(PostedUserData));
        }
      }
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data });

    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: error });
    }
  };

  
// useEffect(()=>{
//   fetchData();
// }, [page])
  



  // useEffect(() => {
  //   if (page >= 0) {
    
  //     fetchData();
  //   }
  // }, [page]);

  //post fetch request------------------------

  return { setPostData ,postData, loading, error, fetchData };
}

export default useFetch;
