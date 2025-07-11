import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from './config';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-10 rounded-b-lg">
        {/* Logo and Site Title with Motto */}
        <div className="flex items-center space-x-3">
          {/* SCALABLE VECTOR GRAPHICS
          New Logo for DevNest */}
          <svg
            className="w-9 h-9 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.472L19.86 8.5L12 12.528L4.14 8.5L12 4.472ZM4 9.5V15.5L12 19.5V13.5L4 9.5ZM20 9.5V15.5L12 19.5V13.5L20 9.5Z"
              fill="currentColor"
            />
            <path
              d="M12 13.5L19.86 9.5L12 5.472L4.14 9.5L12 13.5Z"
              fill="url(#paint0_linear_1_1)"
            />
            <defs>
              <linearGradient id="paint0_linear_1_1" x1="12" y1="5.472" x2="12" y2="13.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818CF8"/>
                <stop offset="1" stopColor="#6366F1"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-gray-800">DevNest</h1>
            <p className="text-sm text-gray-500 mt-0.5">A hub where developers grow.</p>
          </div>
        </div>
        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 hover:text-white"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </header>
      {/* Hero Section with Animation */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 px-6 text-center shadow-lg rounded-b-lg mx-4 mt-4 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Discover, Share, and Collaborate on Coding Projects.
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          A hub for developers to showcase their work, get feedback, and find inspiration.
        </p>

        {/* Animated Illustration */}
        <div className="w-full max-w-xl mb-8">
          <style>
            {`
            @keyframes bounce-and-float {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-15px);
              }
            }

            @keyframes code-pulse {
              0%, 100% {
                opacity: 0.7;
              }
              50% {
                opacity: 1;
              }
            }

            .animate-bounce-and-float {
              animation: bounce-and-float 3s ease-in-out infinite;
            }

            .animate-code-pulse {
              animation: code-pulse 2s ease-in-out infinite;
            }
            `}
          </style>
          <svg className="w-full h-auto animate-bounce-and-float" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background shapes */}
            <rect x="10" y="10" width="180" height="130" rx="15" fill="#4F46E5" className="shadow-lg"/>
            {/* Screen */}
            <rect x="25" y="25" width="150" height="80" rx="8" fill="#1F2937"/>
            {/* Code lines */}
            <rect x="35" y="35" width="130" height="8" rx="2" fill="#34D399" className="animate-code-pulse"/>
            <rect x="35" y="50" width="100" height="8" rx="2" fill="#60A5FA" className="animate-code-pulse" style={{ animationDelay: '0.5s' }}/>
            <rect x="35" y="65" width="115" height="8" rx="2" fill="#FBBF24" className="animate-code-pulse" style={{ animationDelay: '1s' }}/>
            <rect x="35" y="80" width="90" height="8" rx="2" fill="#E879F9" className="animate-code-pulse" style={{ animationDelay: '1.5s' }}/>
            {/* Keyboard */}
            <rect x="30" y="115" width="140" height="20" rx="5" fill="#374151"/>
            {/* Simple character/hand */}
            <circle cx="160" cy="100" r="10" fill="#FDE047"/> {/* Head */}
            <rect x="155" y="110" width="10" height="15" rx="3" fill="#FDE047"/> {/* Body */}
            <rect x="145" y="115" width="15" height="5" rx="2" fill="#FDE047" transform="rotate(-15 145 115)"/> {/* Arm */}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 " onClick={() => navigate('/explore')} >
            Explore Projects
          </button>
          <button  onClick={() => navigate('/create')} 
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Post Your Project
          </button>
        </div>
      </section>
       {user && (
  <div className="mt-10 text-center md:col-span-3">
    <Link
      to="/my-projects"
      className="inline-block bg-purple-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
    >
       View My Projects
    </Link>
  </div>
)}
    
      {/* Main Content - Project Feed */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recent Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">My Awesome React App</h3>
            <p className="text-gray-600 mb-4">
              A simple to-do list built with React and powered by Firebase for real-time data synchronization.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">React</span>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Firebase</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Frontend</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">By: <span className="font-semibold text-indigo-600">dev_master</span></p>
            
          </div>

          {/* Project Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Node.js API for E-commerce</h3>
            <p className="text-gray-600 mb-4">
              A robust RESTful API for an e-commerce platform using Express.js and MongoDB.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Node.js</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Express</span>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">MongoDB</span>
              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Backend</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">By: <span className="font-semibold text-indigo-600">api_guru</span></p>
            
          </div>

          {/* Project Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Visualization Dashboard</h3>
            <p className="text-gray-600 mb-4">
              An interactive dashboard to visualize public health data using D3.js for dynamic charts.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">D3.js</span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">JavaScript</span>
              <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Data Viz</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">By: <span className="font-semibold text-indigo-600">data_wiz</span></p>
            
          </div>
        </div>
      </main>

      {/* About Us Section */}
      <section className="bg-white py-12 px-6 rounded-lg shadow-lg mx-4 mb-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">About DevNest</h2>
          <div className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            <p className="mb-4">
              Welcome to DevNest, your go-to platform for sharing, discovering, and reviewing coding projects. Our mission is to foster a vibrant community where students and developers can showcase their work, receive constructive feedback, and find inspiration for their next big idea.
            </p>
            <p className="mb-4">
              Whether you're looking to get your project noticed, explore innovative solutions from your peers, or simply connect with other passionate coders, DevNest provides the tools and environment you need to grow.
            </p>
            <p>
              Join us today and become a part of a collaborative learning experience that empowers you to build, share, and succeed!
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 px-6 text-center mt-auto rounded-t-lg">
        <p className="text-sm mb-2">© 2025 DevNest. All rights reserved.</p>
        <div className="flex flex-wrap justify-center space-x-4 text-sm">
          <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out">Privacy Policy</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out">Terms of Service</a>
          <span className="text-gray-500">|</span>
          <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};
  
export default Home