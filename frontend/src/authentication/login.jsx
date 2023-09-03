import { React, useState } from "react";
import './styles/login.css'


export default function Login() {

  const [username, setUsername] = useState("");


  const submitHandler = () => {

  }

  return (
    <>
      <form>
        <label>Username: </label>
        <input type="text"></input>
        <label>Password: </label>
        <input type="password" />    
        <input type="submit" onClick={submitHandler} />
      </form>
    </>
  )
}