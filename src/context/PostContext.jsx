import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPosts, createPost, updatePost, deletePost } from '../api/blogApi';

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const addPost = async (postData) => {
    const newPost = await createPost(postData);
    setPosts(prev => [...prev, newPost]);
    return newPost;
  };

  const editPost = async (id, postData) => {
    const updated = await updatePost(id, postData);
    setPosts(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const removePost = async (id) => {
    await deletePost(id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, refreshPosts, addPost, editPost, removePost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
