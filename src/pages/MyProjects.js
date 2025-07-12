import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError('Please sign in to view your projects.');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      try {
        const token = await user.getIdToken();
        const res = await axios.get(`${BACKEND_URL}/api/projects/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        setError('Failed to fetch your projects');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [BACKEND_URL]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = await getAuth().currentUser.getIdToken();
      await axios.delete(`${BACKEND_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((project) => project._id !== id));
      alert('Project deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setEditData({
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
      liveDemo: project.liveDemo || '',
      tags: project.tags.join(', '),
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      await axios.put(`${BACKEND_URL}/api/projects/${editingId}`, {
        ...editData,
        tags: editData.tags.split(',').map((t) => t.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Project updated successfully!');
      setProjects((prev) =>
        prev.map((p) =>
          p._id === editingId
            ? {
                ...p,
                ...editData,
                tags: editData.tags.split(',').map((tag) => tag.trim()),
              }
            : p
        )
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-100 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-indigo-700 text-center mb-8">My Projects</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading projects...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-600">You haven't posted any projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
              {editingId === project._id ? (
                <div className="space-y-3">
                  <input className="w-full border p-2 rounded" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                  <textarea className="w-full border p-2 rounded" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                  <input className="w-full border p-2 rounded" value={editData.githubLink} onChange={(e) => setEditData({ ...editData, githubLink: e.target.value })} />
                  <input className="w-full border p-2 rounded" value={editData.liveDemo} onChange={(e) => setEditData({ ...editData, liveDemo: e.target.value })} />
                  <input className="w-full border p-2 rounded" value={editData.tags} onChange={(e) => setEditData({ ...editData, tags: e.target.value })} />
                  <div className="flex justify-end gap-3">
                    <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-indigo-800">{project.title}</h3>
                  <p className="text-gray-700 mt-1 mb-2 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <div className="text-sm space-y-1">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">🔗 GitHub</a>
                    {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline block">🌐 Live Demo</a>}
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <button onClick={() => handleEdit(project)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProjects;
