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
        const res = await axios.get('http://localhost:5000/api/projects/mine', {
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
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    try {
      const token = await getAuth().currentUser.getIdToken();
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((project) => project._id !== id));
      alert('Project deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
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
      await axios.put(`http://localhost:5000/api/projects/${editingId}`, {
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
      console.error('Update error:', err.response?.data || err.message);
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
            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-indigo-100"
            >
              {editingId === project._id ? (
                <div className="space-y-3">
                  <input className="w-full border p-2 rounded" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                  <textarea className="w-full border p-2 rounded" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                  <input className="w-full border p-2 rounded" value={editData.githubLink} onChange={(e) => setEditData({ ...editData, githubLink: e.target.value })} />
                  <input className="w-full border p-2 rounded" value={editData.liveDemo} onChange={(e) => setEditData({ ...editData, liveDemo: e.target.value })} />
                  <input className="w-full border p-2 rounded" value={editData.tags} onChange={(e) => setEditData({ ...editData, tags: e.target.value })} />
                  <div className="flex justify-end gap-3">
                    <button onClick={handleSaveEdit} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-3 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm space-y-1">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline block">
                        🔗 GitHub Repository
                      </a>
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 hover:underline block">
                          🌐 Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button onClick={() => handleEdit(project)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
                       Edit
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
                       Delete
                    </button>
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
