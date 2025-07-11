import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';

function ProjectFeed() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get('http://localhost:5000/api/projects');
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleLike = async (id) => {
    if (!user) return alert("Login first");
    await axios.put(`http://localhost:5000/api/projects/${id}/like`, {
      userId: user.uid,
    });
    fetchProjects();
  };

  const toggleSave = async (id) => {
    if (!user) return alert("Login first");
    await axios.put(`http://localhost:5000/api/projects/${id}/save`, {
      userId: user.uid,
    });
    fetchProjects();
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map(p => (
        <div key={p._id} className="bg-white p-4 shadow rounded">
          <h3 className="text-xl font-bold">{p.title}</h3>
          <p>{p.description}</p>
          <a href={p.githubLink} className="text-blue-600">GitHub</a>

          <div className="mt-4 flex gap-4">
            <button onClick={() => toggleLike(p._id)} className="text-red-500 hover:scale-110">
              <FaHeart /> {p.likes?.length || 0}
            </button>
            <button onClick={() => toggleSave(p._id)} className="text-blue-500 hover:scale-110">
              <FaBookmark /> {p.saves?.length || 0}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectFeed;
