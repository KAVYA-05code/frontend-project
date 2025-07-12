import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './config';

function ProjectDetails() {
  const { id: projectId } = useParams();
  const [user] = useAuthState(auth);
  const [project, setProject] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [newComment, setNewComment] = useState('');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/projects/${projectId}`);
        setProject(res.data);
        if (user && res.data.favoritedBy?.includes(user.uid)) {
          setIsFavorited(true);
        }
      } catch (err) {
        console.error('Error loading project', err);
      }
    };

    if (projectId) fetchProject();
  }, [projectId, user, BACKEND_URL]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const token = await user.getIdToken();
      await axios.post(
        `${BACKEND_URL}/api/projects/${projectId}/comment`,
        {
          userId: user.uid,
          text: newComment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await axios.get(`${BACKEND_URL}/api/projects/${projectId}`);
      setProject(res.data);
      setNewComment('');
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  const toggleFavorite = async () => {
    try {
      const token = await user.getIdToken();
      await axios.put(
        `${BACKEND_URL}/api/projects/${projectId}/favorites`,
        {
          userId: user.uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFavorited((prev) => !prev);
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };

  if (!project) return <p className="text-center mt-10">Loading project...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="mb-4">
        <strong>Tags:</strong> {project.tags?.join(', ')}
      </div>

      <div className="mb-4">
        <strong>GitHub:</strong>{' '}
        <a href={project.githubLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          {project.githubLink}
        </a>
      </div>

      {project.liveDemo && (
        <div className="mb-4">
          <strong>Live Demo:</strong>{' '}
          <a href={project.liveDemo} className="text-green-600 underline" target="_blank" rel="noopener noreferrer">
            {project.liveDemo}
          </a>
        </div>
      )}

      <div className="text-sm text-gray-500 mb-2">
        Posted by: {project.userName || 'Unknown'}
      </div>

      {user && (
        <FaHeart
          onClick={toggleFavorite}
          className={`cursor-pointer text-2xl ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
        />
      )}

      <h2 className="mt-6 text-xl font-semibold">Comments</h2>
      {project.comments?.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {project.comments.map((comment, idx) => (
            <li key={idx} className="bg-gray-100 p-2 rounded text-sm">
              <span className="font-medium">{comment.userId}</span>: {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 mt-2">No comments yet.</p>
      )}

      {user && (
        <>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="mt-4 w-full border px-3 py-2 rounded"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Submit Comment
          </button>
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
