import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleLike = async (id) => {
    if (!user) return alert('Login first');
    try {
      const token = await user.getIdToken();
      await axios.put(
        `${BACKEND_URL}/api/projects/${id}/like`,
        { userId: user.uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProjects();
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const toggleSave = async (id) => {
    if (!user) return alert('Login first');
    try {
      const token = await user.getIdToken();
      await axios.put(
        `${BACKEND_URL}/api/projects/${id}/save`,
        { userId: user.uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProjects();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <div key={p._id} className="bg-white p-6 rounded shadow hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-bold text-indigo-700 mb-2">{p.title}</h3>
          <p className="text-gray-700 mb-2 line-clamp-3">{p.description}</p>
          {p.githubLink && (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              🔗 GitHub
            </a>
          )}

          <div className="mt-4 flex gap-6 items-center text-gray-600">
            <button
              onClick={() => toggleLike(p._id)}
              className="flex items-center gap-1 hover:text-red-500"
            >
              <FaHeart className="text-lg" /> {p.likes?.length || 0}
            </button>
            <button
              onClick={() => toggleSave(p._id)}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <FaBookmark className="text-lg" /> {p.saves?.length || 0}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectFeed;
