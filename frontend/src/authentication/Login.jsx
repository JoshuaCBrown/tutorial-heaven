import { React, useState } from "react";
import "./styles/auth.css";
import axios from "axios";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //use react-hook-form and zod resolver or yup library to validate form input

  const submitHandler = (e) => {
    axios({
      method: "POST",
      data: {
        email: loginEmail,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => console.log(res));
  };

  return (
    <>
      <form>
        <label>Email: </label>
        <input type="text" onChange={(e) => setLoginEmail(e.target.value)} />
        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <input type="submit" onClick={submitHandler} />
      </form>
    </>
  );
}
