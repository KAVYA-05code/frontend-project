import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from './config';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("Logged In");
        navigate("/");
      } else {
        console.log("Logged out");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  function loginuser(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, user, pass)
      .then(() => {
        console.log("User logged in");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to login:");
        alert("Login failed " );
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="w-full max-w-md mx-auto bg-white shadow-md py-4 px-6 flex items-center justify-center rounded-t-lg mb-8">
        <div className="flex items-center space-x-3">
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
                <stop stopColor="#818CF8" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-gray-800">DevNest</h1>
            <p className="text-sm text-gray-500 mt-0.5">A hub where developers grow.</p>
          </div>
        </div>
      </header>

      <div className="w-full max-w-md bg-white p-8 rounded-b-lg shadow-xl">
        <form className="space-y-6" onSubmit={loginuser}>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Login to your DevNest account
          </h2>

          <div>
            <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email-login"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setuser(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password-login"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={(e) => setpass(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder=""
            />
          </div>

          <div className="flex items-center justify-between">

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
              <button
                onClick={() => navigate('/reset-password')}
                className="text-indigo-600 hover:underline"
              >
                Reset it
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>

          <div className="text-center text-sm mt-6">
            New to DevNest?{' '}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
