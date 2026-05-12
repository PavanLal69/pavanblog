import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import styles from './CourseDetail.module.css';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, loading } = useCourses();
  
  const course = courses.find(c => String(c.id) === String(id));

  if (loading) return <div className="container" style={{ padding: '4rem 2rem' }}>Loading course details...</div>;
  if (!course) return <div className="container" style={{ padding: '4rem 2rem' }}>Course not found. <button onClick={() => navigate('/courses')}>Back to Courses</button></div>;

  return (
    <main className={styles.courseDetailPage}>
      <div className={styles.hero}>
        <img src={course.image} alt={course.title} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <div className="container">
            <span className={styles.badge}>{course.level}</span>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.duration}>🕒 Duration: {course.duration}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <div className={styles.mainInfo}>
            <section className={styles.section}>
              <h2>Course Overview</h2>
              <p>{course.description}</p>
            </section>

            <section className={styles.section}>
              <h2>Course Modules</h2>
              <p>Download or view the course materials (PPTX) for each module below.</p>
              
              <div className={styles.moduleList}>
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module) => (
                    <div key={module.id} className={styles.moduleItem}>
                      <div className={styles.moduleInfo}>
                        <div className={styles.moduleIcon}>📄</div>
                        <div>
                          <h4 className={styles.moduleTitle}>{module.title}</h4>
                          <span className={styles.fileInfo}>PowerPoint Presentation (.pptx)</span>
                        </div>
                      </div>
                      <div className={styles.moduleActions}>
                        <button 
                          onClick={() => {
                            const fileUrl = window.location.origin + '/modules/' + module.file;
                            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                              window.open(fileUrl, '_blank');
                            } else {
                              window.open(`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`, '_blank');
                            }
                          }}
                          className={styles.viewModuleBtn}
                        >
                          View {window.location.hostname === 'localhost' ? 'File' : 'Online'}
                        </button>
                        <a 
                          href={`/modules/${module.file}`} 
                          download 
                          className={styles.downloadBtn}
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noModules}>No modules available for this course yet.</p>
                )}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Course Assignments</h2>
              <p>Complete these tasks to practice your prompt engineering skills.</p>
              
              <div className={styles.assignmentGrid}>
                {course.assignments && course.assignments.length > 0 ? (
                  course.assignments.map((assignment) => (
                    <div key={assignment.id} className={styles.assignmentCard}>
                      <div className={styles.assignmentHeader}>
                        <span className={styles.assignmentLabel}>Assignment {assignment.id}</span>
                        <span className={styles.dueDate}>Due: {assignment.dueDate}</span>
                      </div>
                      <h4 className={styles.assignmentTitle}>{assignment.title}</h4>
                      <p className={styles.assignmentDesc}>{assignment.description}</p>
                      <button className={styles.submitBtn}>Submit Assignment</button>
                    </div>
                  ))
                ) : (
                  <p>No assignments posted yet.</p>
                )}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sticky}>
              <button onClick={() => navigate('/courses')} className={styles.backBtn}>
                &larr; All Courses
              </button>
              <div className={styles.courseQuickStats}>
                <h3>Quick Stats</h3>
                <ul>
                  <li><strong>Level:</strong> {course.level}</li>
                  <li><strong>Duration:</strong> {course.duration}</li>
                  <li><strong>Modules:</strong> {course.modules ? course.modules.length : 0}</li>
                  <li><strong>Assignments:</strong> {course.assignments ? course.assignments.length : 0}</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
