import { React, useState } from "react";
import "./styles/auth.css";
import axios from "axios";

export default function GetUser() {
  const [authUser, setAuthUser] = useState("");

  //use react-hook-form and zod resolver or yup library to validate form input

  const isUserAuth = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/user",
    }).then((res) => console.log(res));
  };

  return (
    <>
      <form>
        <label>Username: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkValidity(email, emailRegEx, emailClass)}
        />
        <label>Password: </label>
        <input type="password" />
        <input type="submit" onClick={submitHandler} />
      </form>
    </>
  );
}
