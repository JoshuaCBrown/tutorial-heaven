import { React, useState } from "react";
import "./styles/auth.css";
import axios from "axios";

//use react-hook-form and zod resolver or yup library to validate form input
//-----------------------READ THIS^ --------------------------------------------
export default function Register() {
  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRepeatPassword, setFormRepeatPassword] = useState("");

  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegEx =
    /^[a-z0-9][a-z0-9_.-]+@[a-z0-9]+\.(com|net|org|biz|uk|ca|gov|us|eu|edu)$/i;

  let emailClass = "waiting";
  let passClass = "waiting";
  let repeatPassClass = "waiting";

  function checkValidity(str, regexVal, classVar) {
    if (regexVal.test(str)) {
      classVar = "valid";
    } else {
      classVar = "invalid";
    }
  }
  function checkMatch() {
    if (password !== repeatPassword) {
      repeatPassClass = "invalid";
    } else {
      repeatPassClass = "valid";
    }
  }

  const submitHandler = () => {
    axios({
      method: "POST",
      data: {
        username: formUsername,
        email: formEmail,
        password: formPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    }).then((res) => console.log(res));
  };

  return (
    <>
      <form>
        <label>Username: </label>
        <input type="text" onChange={(e) => setFormUsername(e.target.value)} />
        <label>Email: </label>
        <input
          type="email"
          onChange={(e) => setFormEmail(e.target.value)}
          onBlur={checkValidity(email, emailRegEx, emailClass)}
          className={emailClass}
        />
        <label>Password: </label>
        <input
          type="password"
          onChange={(e) => setFormPassword(e.target.value)}
          onBlur={checkValidity(password, passwordRegEx, passClass)}
          className={passClass}
        />
        <label>Repeat Password: </label>
        <input
          type="password"
          onChange={(e) => setFormRepeatPassword(e.target.value)}
          onBlur={checkMatch}
          className={repeatPassClass}
        />
        <input type="submit" onClick={submitHandler} />
      </form>
    </>
  );
}
