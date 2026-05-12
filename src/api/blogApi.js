import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Blogs
export const fetchPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
};

export const createPost = async (postData) => {
  const docRef = await addDoc(collection(db, "posts"), postData);
  return { id: docRef.id, ...postData };
};

export const updatePost = async (id, postData) => {
  const postRef = doc(db, "posts", id);
  const { id: _, ...dataToUpdate } = postData;
  await updateDoc(postRef, dataToUpdate);
  return { id, ...dataToUpdate };
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, "posts", id));
  return { success: true };
};

// Courses
export const fetchCourses = async () => {
  const querySnapshot = await getDocs(collection(db, "courses"));
  const courses = [];
  querySnapshot.forEach((doc) => {
    courses.push({ id: doc.id, ...doc.data() });
  });
  return courses;
};

export const createCourse = async (courseData) => {
  const docRef = await addDoc(collection(db, "courses"), courseData);
  return { id: docRef.id, ...courseData };
};

export const updateCourse = async (id, courseData) => {
  const courseRef = doc(db, "courses", id);
  const { id: _, ...dataToUpdate } = courseData;
  await updateDoc(courseRef, dataToUpdate);
  return { id, ...dataToUpdate };
};

export const deleteCourse = async (id) => {
  await deleteDoc(doc(db, "courses", id));
  return { success: true };
};

// File Upload
export const uploadFile = async (file) => {
  if (!file) throw new Error("No file provided");
  const uniqueName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `modules/${uniqueName}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { filename: file.name, url };
};

// Auth
export const adminLogin = async (password) => {
  if (password === "admin123") {
    return { status: "success", token: "mock-token", user: { role: "admin", username: "admin" } };
  }
  throw new Error('Invalid password');
};
