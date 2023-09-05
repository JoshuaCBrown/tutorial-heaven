import { React, useState } from "react";
import './styles/login.css'


export default function Login() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  function checkValidity(stateSetter, str, regexVal) {
    if (regexVal.test(str)) {
        anInput.className = 'valid';
    } else {
        anInput.className = 'invalid';
    };
    submitAble();
  };

  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegEx = /^[a-z0-9][a-z0-9_.-]+@[a-z0-9]+\.(com|net|org|biz|uk|ca|gov|us|eu|edu)$/i;
  
  checkValidity(emailInput, emailInput.value, emailRegEx);
  
  
  
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