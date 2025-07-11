import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from './config';
import {
  Home,
  Compass,
  FolderPlus,
  FolderOpen,
  LogOut,
  LogIn,
  Menu,
  X,
  User,
} from 'lucide-react';

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Explore', icon: Compass, path: '/explore' },
    { name: 'Create', icon: FolderPlus, path: '/create' },
    { name: 'My Projects', icon: FolderOpen, path: '/my-projects' },
  ];

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  const NavLink = ({ name, icon: Icon, path }) => (
    <Link
      to={path}
      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
        location.pathname === path
          ? 'bg-indigo-100 text-indigo-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {name}
    </Link>
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full bg-white w-72 shadow-md transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex flex-col h-full p-6">
        
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-indigo-600">DevNest</h1>
            <p className="text-xs text-gray-400">Collaborate. Build. Grow.</p>
          </div>
          <nav className="flex flex-col gap-2 flex-grow">
            {navItems.map((item) => (
              <NavLink key={item.name} {...item} />
            ))}
            {user && (
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition"
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Link>
            )}
          </nav>
          <div className="mt-6">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 rounded-lg transition"
              >
                <LogIn className="w-5 h-5 mr-3" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
