import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import MyHome from './home/MyHome'
import AddResource from './addresource/AddResource'
import AddVideo from './addresource/AddVideo'
import AddArticle from './addresource/AddArticle'
import AddText from './addresource/AddText'
import Login from './authentication/login'

const [username, setUsername] = useState(null);

function userIsAuth() {
  
}

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='addresource'>Add Resource</Link>
          </li>
          <li>
            <Link to='login'>{userIsAuth ? username : "Login/Register"}</Link>
          </li>
        </ul> 
      </nav>
      <Routes>
        <Route path='/' element={<MyHome />} />
        <Route path='addresource' element={<AddResource />}>
          <Route path='addvideo' element={<AddVideo />} />
          <Route path='addarticle' element={<AddArticle />} />
          <Route path='addtext' element={<AddText />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App;
