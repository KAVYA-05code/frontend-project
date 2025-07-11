import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import ProjectFeed from './pages/ProjectFeed';
import FavoriteProjects from './pages/FavoriteProjects';
import MyProjects from './pages/MyProjects';
import ResetPassword from './pages/RecentPassword';
import ExploreProjects from './pages/ExploreProjects';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './pages/config';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidebar user={user} />
        <div className="flex-grow ml-0 md:ml-64 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/projects" element={<ProjectFeed />} />
            <Route path="/my-projects" element={<MyProjects user={user} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/explore" element={<ExploreProjects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<FavoriteProjects/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;