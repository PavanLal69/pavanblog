import styles from './About.module.css';
import {
  experience,
  eventsOrganized,
  achievementsAndResponsibilities,
  workshopsAttended,
  memberships,
  publications
} from '../data/aboutData';

export default function About() {
  return (
    <main className={styles.aboutPage}>
      <div className="container">
        <section className={styles.profileSection}>
          <div className={styles.sidebar}>
            <div className={styles.imageWrapper}>
              <img src="/swapana.jpg" alt="Dr. Swapna Mudrakola" className={styles.profileImage} />
            </div>
            
            <div className={styles.sidebarSection}>
              <h3>Contact</h3>
              <ul className={styles.contactList}>
                <li><strong>Phone:</strong> 9398168896</li>
                <li><strong>Email ID:</strong> swapna0801@gmail.com</li>
                <li><strong>Address:</strong> 17-1-387/28/1 Saidabad, Vani Nagar Colony Hyderabad.</li>
              </ul>
            </div>

            <div className={styles.sidebarSection}>
              <h3>Education</h3>
              <ul className={styles.educationList}>
                <li>
                  <strong>Ph.D - CSE (June 2018 - July 2025)</strong>
                  <p>Osmania University, Telangana, India.</p>
                </li>
                <li>
                  <strong>M.Tech - IT (2011)</strong>
                  <p>JNTU - ASTRA</p>
                </li>
                <li>
                  <strong>B.Tech - CSE (2006)</strong>
                  <p>JNTU - PIRM</p>
                </li>
              </ul>
            </div>
            
            <div className={styles.sidebarSection}>
              <h3>Expertise</h3>
              <ul className={styles.expertiseList}>
                <li><strong>BoS Member</strong> - Design Course Structures and Syllabus Framing.</li>
                <li><strong>IQAC</strong> - Designed the University Repositories for accreditations & NewsLetters.</li>
                <li><strong>Develop</strong> the Research Project Proposals.</li>
                <li><strong>Ability</strong> to Write Research article upto Scopus & SCI Level</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.mainContent}>
            <h1 className={styles.name}>Dr. Swapna Mudrakola</h1>
            <p className={styles.summary}>
              I am committed to providing high-quality education and fostering a stimulating learning environment. My goal is to contribute to the academic excellence of the Institution by leveraging my expertise in Artificial Intelligence, Machine Learning, and Data Science using R, Prompt Engineering, AI in Healthcare engaging students in innovative learning experiences, and actively participating in cutting-edge research initiatives. As an Assistant Professor, I am determined to inspire and mentor students, contribute to the growth of the department, and advance the institution's reputation for academic excellence in the field of Computer Science and Engineering.
            </p>
            
            <h2 className={styles.sectionHeading}>Experience</h2>
            <div className={styles.timeline}>
              {experience.map((exp, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineDate}>{exp.date}</div>
                  <div className={styles.timelineContent}>
                    <h4>{exp.institution}</h4>
                    <p className={styles.role}>{exp.role}</p>
                    <p className={styles.desc}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.listSection}>
              <h2 className={styles.sectionHeading}>Events Organized</h2>
              <ul>
                {eventsOrganized.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className={styles.listSection}>
              <h2 className={styles.sectionHeading}>Achievements & Responsibilities</h2>
              <ul>
                {achievementsAndResponsibilities.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className={styles.listSection}>
              <h2 className={styles.sectionHeading}>Short Term Course/Workshop Attended</h2>
              <ul>
                {workshopsAttended.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className={styles.listSection}>
              <h2 className={styles.sectionHeading}>Membership</h2>
              <ul>
                {memberships.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className={styles.listSection}>
              <h2 className={styles.sectionHeading}>Article Publication Details</h2>
              
              <h3>Conference</h3>
              <ul>
                {publications.conference.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>Journal Articles</h3>
              <ul>
                {publications.journal.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>Chapter</h3>
              <ul>
                {publications.chapter.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <h3>Patent</h3>
              <ul>
                {publications.patent.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
