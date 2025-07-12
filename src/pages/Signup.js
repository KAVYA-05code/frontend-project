import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from './config';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  function signupuser(e) {
    e.preventDefault();

    if (pass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, user, pass)
      .then(() => {
        console.log("User registered");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Signup failed:", err.message);
        alert(err.message);
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
      </header>
      <div className="w-full max-w-md bg-white p-8 rounded-b-lg shadow-xl">
        <form className="space-y-6" onSubmit={signupuser}>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Create your DevNest account
          </h2>

          <div>
            <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email-signup"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={user}
              onChange={(e) => setuser(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">
              Password (6 characters minimum)
            </label>
            <input
              id="password-signup"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={pass}
              onChange={(e) => setpass(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder=""
            />
          </div>

          <div>
            <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password (6 characters minimum)
            </label>
            <input
              id="confirm-password-signup"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder=""
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
