import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FavoriteProjects() {
  const [user, loading] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const res = await axios.get(`${BASE_URL}/api/projects/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: user.uid,
          },
        });

        setFavorites(res.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setFetching(false);
      }
    };

    fetchFavorites();
  }, [user, BASE_URL]);

  if (loading || fetching) return <p className="text-center mt-10">Loading favorites...</p>;

  if (!user) return <p className="text-center mt-10 text-red-500">Please log in to view your favorites.</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-red-600">My Favorite Projects</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((project) => (
            <div key={project._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h4 className="text-lg font-semibold text-indigo-700">{project.title}</h4>
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
