import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './config';
import { FaThumbsUp, FaBookmark, FaStar, FaRegThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  const [ratings, setRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to load projects', err);
      }
    };

    if (user) fetchProjects();
  }, [user, BASE_URL]);

  const getAuthHeaders = async () => {
    const token = await user.getIdToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const toggleLike = async (projectId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/projects/${projectId}/like`,
        { userId: user.uid },
        await getAuthHeaders()
      );
      setLikes((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const toggleSave = async (projectId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/projects/${projectId}/save`,
        { userId: user.uid },
        await getAuthHeaders()
      );
      setSaved((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
    } catch (err) {
      console.error('Failed to toggle save:', err);
    }
  };

  const rateProject = async (projectId, stars) => {
    try {
      await axios.put(
        `${BASE_URL}/api/projects/${projectId}/rate`,
        { userId: user.uid, stars },
        await getAuthHeaders()
      );
      setRatings((prev) => ({ ...prev, [projectId]: stars }));
    } catch (err) {
      console.error('Failed to rate project:', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500 font-semibold">Please log in to explore projects.</p>;

  const filteredProjects = projects.filter(project => {
    const matchKeyword =
      searchQuery === '' ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTag = tagFilter === '' || project.tags?.includes(tagFilter);
    const matchUser = userFilter === '' || project.userName?.toLowerCase().includes(userFilter.toLowerCase());

    return matchKeyword && matchTag && matchUser;
  });

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="px-4 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-indigo-800">Explore All Projects</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search by title/description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <input
          type="text"
          placeholder="Filter by tag..."
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <input
          type="text"
          placeholder="Filter by user..."
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map(project => {
          const averageRating =
            project.ratings && project.ratings.length > 0
              ? (
                  project.ratings.reduce((sum, r) => sum + r.stars, 0) / project.ratings.length
                ).toFixed(1)
              : 'No ratings';

          return (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold text-indigo-700">{project.title || 'Untitled Project'}</h2>
              <p className="mt-2 text-gray-600">{project.description?.slice(0, 100) + '...'}</p>

              {Array.isArray(project.tags) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 text-indigo-700 text-xs px-2.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              )}

              <p className="mt-2 text-sm text-gray-500">Posted by: {project.userName || 'Unknown'}</p>
              <p className="text-sm text-yellow-600">⭐ Average Rating: {averageRating}</p>

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  GitHub Repository
                </a>
              )}

              <div className="mt-4 flex items-center space-x-4">
                <button onClick={() => toggleLike(project._id)}>
                  {likes[project._id] ? <FaThumbsUp className="text-blue-900" /> : <FaRegThumbsUp />}
                </button>
                <FaBookmark
                  onClick={() => toggleSave(project._id)}
                  className={saved[project._id] ? 'text-yellow-400 cursor-pointer' : 'text-gray-400 cursor-pointer'}
                />
              </div>

              <div className="mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <FaStar
                    key={star}
                    onClick={() => rateProject(project._id, star)}
                    className={`inline-block cursor-pointer ${ratings[project._id] >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <button
                className="mt-2 ml-4 text-sm text-indigo-600 hover:underline"
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreProjects;
