import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from './config';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(' Password reset email sent! Please check your inbox.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send reset email. Please check the email entered.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <label className="block mb-2 font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
          >
            Send Reset Email
          </button>
        </form>
        {message && <p className="text-center mt-4 text-sm text-gray-700">{message}</p>}

        <div className="mt-4 text-sm text-center">
          <button onClick={() => navigate('/login')} className="text-indigo-600 hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
