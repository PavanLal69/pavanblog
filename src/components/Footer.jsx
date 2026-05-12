import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoEducator}>Educator</span>
            <span className={styles.logoBlog}>Blog</span>
          </div>
          <p className={styles.tagline}>
            Advancing knowledge and transforming the future through research, education, and innovation.
          </p>
        </div>
        
        <div className={styles.linksContainer}>
          <div className={styles.linkGroup}>
            <h4>Academic Profiles</h4>
            <ul>
              <li><a href="https://scholar.google.com/citations?user=ZDvTf7EAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
              <li><a href="https://orcid.org/0000-0003-2816-6857" target="_blank" rel="noopener noreferrer">ORCID</a></li>
              <li><a href="https://www.scopus.com/authid/detail.uri?authorId=59010452300" target="_blank" rel="noopener noreferrer">Scopus</a></li>
              <li><a href="https://vidwan.inflibnet.ac.in/profile/249051" target="_blank" rel="noopener noreferrer">Vidwan</a></li>
              <li><a href="https://aurora.edu.in/swapna.php" target="_blank" rel="noopener noreferrer">Aurora Profile</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Educator Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
