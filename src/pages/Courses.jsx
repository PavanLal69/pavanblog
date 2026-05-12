import { Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import styles from './Courses.module.css';

export default function Courses() {
  const { courses, loading, error } = useCourses();

  if (loading) return <div className="container" style={{ padding: '4rem 2rem' }}>Loading courses...</div>;
  if (error) return <div className="container" style={{ padding: '4rem 2rem', color: 'red' }}>Error: {error}</div>;

  return (
    <main className={styles.coursesPage}>
      <div className="container">
        <header className={styles.header}>
          <h1>My Courses</h1>
          <p>Explore specialized technical courses designed for engineering and AI enthusiasts.</p>
        </header>

        <div className={styles.courseGrid}>
          {courses.map(course => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.imageWrapper}>
                <Link to={`/course/${course.id}`}>
                  <img src={course.image} alt={course.title} className={styles.image} />
                </Link>
              </div>
              <div className={styles.content}>
                <div className={styles.badge}>{course.level}</div>
                <h3 className={styles.title}>
                  <Link to={`/course/${course.id}`}>{course.title}</Link>
                </h3>
                <p className={styles.description}>{course.description}</p>
                <div className={styles.footer}>
                  <span className={styles.duration}>🕒 {course.duration}</span>
                  <Link to={`/course/${course.id}`} className={styles.viewBtn}>Learn More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
