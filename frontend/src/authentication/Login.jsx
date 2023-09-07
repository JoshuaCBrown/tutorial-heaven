import { React, useState } from "react";
import "./styles/auth.css";

export default function Login() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  //use react-hook-form and zod resolver or yup library to validate form input


  const submitHandler = () => {
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
