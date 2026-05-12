import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCourses, createCourse, updateCourse, deleteCourse } from '../api/blogApi';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshCourses = async () => {
    try {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  const addCourse = async (courseData) => {
    const newCourse = await createCourse(courseData);
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const editCourse = async (id, courseData) => {
    const updated = await updateCourse(id, courseData);
    setCourses(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const removeCourse = async (id) => {
    await deleteCourse(id);
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CourseContext.Provider value={{ courses, loading, error, refreshCourses, addCourse, editCourse, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export const useCourses = () => useContext(CourseContext);
