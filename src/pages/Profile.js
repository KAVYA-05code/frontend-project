import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from './config';
import { updateProfile } from 'firebase/auth';

function Profile() {
  const [user, loading] = useAuthState(auth);
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');

      const fetchData = async () => {
        try {
          const token = await user.getIdToken();
          const config = { headers: { Authorization: `Bearer ${token}` } };

          const [myRes, likedRes, savedRes] = await Promise.all([
            axios.get(`${BACKEND_URL}/api/projects/mine`, config),
            axios.get(`${BACKEND_URL}/api/projects/liked?userId=${user.uid}`, config),
            axios.get(`${BACKEND_URL}/api/projects/saved?userId=${user.uid}`, config),
          ]);

          setMyPosts(myRes.data);
          setLikedPosts(likedRes.data);
          setSavedPosts(savedRes.data);
        } catch (err) {
          console.error('Error fetching profile data:', err);
          setError('Failed to load profile data. Please try again later.');
        }
      };

      fetchData();
    }
  }, [user, BACKEND_URL]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500 font-semibold">Please log in to view your profile.</p>;

  const handleUpdateDisplayName = async () => {
    setUpdating(true);
    try {
      await updateProfile(user, { displayName });
      setEditMode(false);
    } catch (err) {
      alert('Failed to update display name');
    } finally {
      setUpdating(false);
    }
  };

  const renderPostCard = (post) => (
    <div key={post._id} className="bg-white p-4 rounded shadow">
      <h4 className="text-lg font-semibold">{post.title}</h4>
      <p className="text-sm text-gray-600">{post.description?.slice(0, 100)}...</p>
      <button
        onClick={() => navigate(`/projects/${post._id}`)}
        className="mt-2 text-sm text-indigo-600 hover:underline"
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">👤 My Profile</h2>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        {user.photoURL && (
          <img src={user.photoURL} alt="profile" className="w-16 h-16 rounded-full" />
        )}
        <div>
          {editMode ? (
            <>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <button
                onClick={handleUpdateDisplayName}
                className="ml-2 text-sm text-green-600 hover:underline"
                disabled={updating}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="text-lg font-semibold">
                {user.displayName || 'Unnamed User'}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="text-sm text-blue-600 hover:underline ml-2"
              >
                Edit
              </button>
            </>
          )}
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">My Posts</h3>
          <p className="text-2xl text-indigo-600 font-bold">{myPosts.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Liked</h3>
          <p className="text-2xl text-pink-500 font-bold">{likedPosts.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Saved</h3>
          <p className="text-2xl text-green-500 font-bold">{savedPosts.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow text-center mb-10">
        <h3 className="text-lg font-semibold text-gray-700">Favorites</h3>
        <button
          onClick={() => navigate('/favorites')}
          className="mt-2 text-red-500 hover:underline"
        >
          View Favorites
        </button>
      </div>

      {/* My Posts Preview */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-indigo-700 mb-4">My Posts</h3>
        {myPosts.length === 0 ? (
          <p className="text-gray-500">You haven’t created any projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myPosts.map(renderPostCard)}
          </div>
        )}
      </section>

      {/* Liked Projects */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-pink-600 mb-4">Liked Projects</h3>
        {likedPosts.length === 0 ? (
          <p className="text-gray-500">You haven’t liked any projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {likedPosts.map(renderPostCard)}
          </div>
        )}
      </section>

      {/* Saved Projects */}
      <section>
        <h3 className="text-xl font-bold text-green-600 mb-4">Saved Projects</h3>
        {savedPosts.length === 0 ? (
          <p className="text-gray-500">You haven’t saved any projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedPosts.map(renderPostCard)}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
