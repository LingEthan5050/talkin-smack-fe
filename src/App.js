import "./App.css";
import Splash from "./components/Splash/Splash.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Profile from "./components/Profile/Profile.jsx";
import SignUp from "./components/Sign_Up/Sign_Up.jsx";
import { useParams, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsers, getComments, getCommentsOnPost, getPosts } from "./services/apiCalls";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentsOnPost, setCommentsOnPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggleApiCall, setToggleApiCall] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      const response = await getUsers();
      setUsers(response);
      // console.log(response)
      const res = await getComments();
      setComments(res);
      console.log(res)
      // const res3 = await getCommentsOnPost();
      // setCommentsOnPost(res3);
      // console.log(res3)
      const res2 = await getPosts();
      setPosts(res2);
      console.log(res2)
    };
    callApi();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route
          path="/home"
          element={
            <Home
              comments={comments}
              posts={posts}
              users={users}
              setToggleApiCall={setToggleApiCall}
            /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
