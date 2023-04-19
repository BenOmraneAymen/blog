import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup.';
import Login from './components/login';
import MainPage from './components/mainPage';
import Profile from './components/profile';
import Upload from './components/upload';
import Admin_main from './components/admin_main';
import { createContext, useState,useEffect } from 'react';

export const themeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light")

  const toggleDarkMode = ()=>{
    if(theme==="light"){
      setTheme("dark")
    }else{
      setTheme("light")
    }
  }

  useEffect(()=>{
    console.log("useeffect worked")
    if(theme==="light"){
      document.documentElement.classList.remove("dark")
    }else{
      document.documentElement.classList.add("dark")
    }
  },[theme])


  return (
    <div className="App">
      <themeContext.Provider value={ {toggleDarkMode} }>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="nav/:id" element={<MainPage />} />
            <Route path="/profile/:suId" element={<Profile />} />
            <Route path="upload" element={<Upload />} />
            <Route path="/admin" element={<Admin_main />} />
            <Route path="/admin/:id" element={<Admin_main />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </themeContext.Provider>
    </div>
  );
}

export default App;
