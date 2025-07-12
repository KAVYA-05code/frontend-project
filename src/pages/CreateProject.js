import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubLink: '',
    liveDemo: '',
    
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to create a project.");
    return;
  }

  setLoading(true);

  try {
    const token = await user.getIdToken();

    await axios.post('https://peer-project-hub-api.onrender.com/api/projects', {
  ...formData,
  tags: formData.tags.split(',').map(t => t.trim()),
  userName: user.displayName || user.email || 'Unnamed User'
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});


    alert('Project posted successfully!');
    navigate('/my-projects');
  } catch (err) {
    console.error(err);
    alert('Failed to post project');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-white to-purple-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-700">Post Your Project</h1>
          <p className="mt-2 text-gray-600 text-lg">Let the world discover your work on DevNest!</p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="e.g. Smart Expense Tracker"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tags</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="e.g. React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub Link</label>
              <input
                name="githubLink"
                type="url"
                value={formData.githubLink}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="https://github.com/your-project"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Live Demo Link</label>
              <input
                name="liveDemo"
                type="url"
                value={formData.liveDemo}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="https://yourapp.netlify.app"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={10}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Explain what your project does, how you built it, and any challenges you faced..."
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              {loading ? 'Posting...' : ' Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;