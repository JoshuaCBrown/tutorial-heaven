import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import MyHome from "./home/MyHome";
import AddResource from "./addresource/AddResource";
import AddVideo from "./addresource/AddVideo";
import AddArticle from "./addresource/AddArticle";
import AddText from "./addresource/AddText";
import Auth from "./authentication/Auth";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import axios from "axios";

function App() { 
  const [username, setUsername] = useState(null);
  const [authUser, setAuthUser] = useState("none");
  const [userId, setUserId] = useState("");

  const IsAuth = () => {
    axios.get("http://localhost:3001/user").then((res) => {
      console.log(res.data);
      setAuthUser(res.data.username);
      setUserId(res.data.userId);
      return (
        <p>{res.data.username}</p>
      );
    });
  }
  useEffect(() => {
    axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:3001/user"
      })
      .then((response) => {
        console.log(response.data);
        setAuthUser(response.data.username);
        setUserId(response.data.userId);
      })
      .catch((error) => {
        console.error("Error fetching authentication", error);
      });
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="addresource">Add Resource</Link>
          </li>
          <li>
            <Link to="auth">Login/Register</Link>
          </li>
          <li>{authUser}</li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MyHome userId={userId} />} />
        <Route path="addresource" element={<AddResource />}>
          <Route path="addvideo" element={<AddVideo />} />
          <Route path="addarticle" element={<AddArticle />} />
          <Route path="addtext" element={<AddText />} />
        </Route>
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
