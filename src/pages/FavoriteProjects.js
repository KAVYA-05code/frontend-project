import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FavoriteProjects() {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/favorites?userId=${user.uid}`);
        setFavorites(res.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600"> My Favorite Projects</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(project => (
            <div key={project._id} className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="text-sm text-gray-600">{project.description?.slice(0, 100)}...</p>
              <button
                onClick={() => navigate(`/projects/${project._id}`)}
                className="mt-2 text-sm text-indigo-600 hover:underline"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoriteProjects;
