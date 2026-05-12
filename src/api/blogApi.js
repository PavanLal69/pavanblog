const API_URL = 'http://localhost:8001';

// Blogs
export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const createPost = async (postData) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

export const updatePost = async (id, postData) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
};

export const deletePost = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
};

// Courses
export const fetchCourses = async () => {
  const response = await fetch(`${API_URL}/courses`);
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
};

export const createCourse = async (courseData) => {
  const response = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) throw new Error('Failed to create course');
  return response.json();
};

export const updateCourse = async (id, courseData) => {
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courseData),
  });
  if (!response.ok) throw new Error('Failed to update course');
  return response.json();
};

export const deleteCourse = async (id) => {
  const response = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete course');
  return response.json();
};

// File Upload
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload file');
  return response.json();
};

// Auth
export const adminLogin = async (password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!response.ok) throw new Error('Invalid password');
  return response.json();
};
