import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup.';
import Login from './components/login';
import MainPage from './components/mainPage';
import Profile from './components/profile';
import Upload from './components/upload';
import Admin_main from './components/admin_main';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="nav/:id" element={<MainPage />}/>
          <Route path="/profile/:suId" element={<Profile />} />
          <Route path="upload" element={<Upload />} />
          <Route path="/admin" element={<Admin_main />} />
          <Route path="/admin/:id" element={<Admin_main />} />
         <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
