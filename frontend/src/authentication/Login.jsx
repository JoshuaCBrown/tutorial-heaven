import { React, useState } from "react";
import "./styles/auth.css";
import axios from "axios";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const [userId, setUserId] = useState("");

  //use react-hook-form and zod resolver or yup library to validate form input

  const submitHandler = () => {
    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };
    axios({
      method: "POST",
      data: loginData,
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => console.log(res));
  };

  const checkAuth = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/user",
    }).then((res) => {
      console.log(res.data);
      setAuthStatus(res.data.username);
      setUserId(res.data.userId);
    });
  };

  const logOut = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    }).then((res) => {
      console.log(res.data);
    })
    };
  

  return (
    <>
      <div>
        <label>Email: </label>
        <input type="text" onChange={(e) => setLoginEmail(e.target.value)} />
        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={submitHandler}>Submit</button>
        <button onClick={checkAuth}>Check Auth</button>
        <button onClick={logOut}>Log out</button>
        <div>{authStatus}</div>
      </div>
    </>
  );
}
