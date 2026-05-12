import { Search, Menu } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logoEducator}>Educator</span>
            <span className={styles.logoBlog}>Blog</span>
          </Link>
        </div>
        
        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ""}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
                Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" className={({ isActive }) => isActive ? styles.active : ""}>
                Courses
              </NavLink>
            </li>
            
            {/* Conditional Admin Links */}
            {user ? (
              <li style={{ marginTop: '2rem' }}>
                <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ""} style={{ color: 'var(--color-primary)' }}>
                  Admin Panel
                </NavLink>
              </li>
            ) : (
              <li style={{ marginTop: '2rem' }}>
                <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Admin Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.navActions}>
          <button className={styles.iconButton} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={`${styles.iconButton} ${styles.mobileMenuBtn}`} aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
