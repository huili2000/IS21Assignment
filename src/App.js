import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import StickyBoard from './components/stickBoard';
import UserAdmin from './components/userAdmin';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  const [userName, setUserName] = useState("")
  const [permission, setPermission] = useState("")
  const [role, setRole] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setUserName={setUserName} setPermission={setPermission} setRole={setRole} />} />
          <Route path="/stickyBoard" element={<StickyBoard userName={userName} permission={permission} role={role} />}  />
          <Route path="/userAdmin" element={<UserAdmin userName={userName} permission={permission} role={role} />}  />
         

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
