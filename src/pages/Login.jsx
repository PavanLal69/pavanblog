import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminLogin } from '../api/blogApi';
import styles from './Login.module.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await adminLogin(password);
      login(password); // Still call local login to update context
      navigate('/admin');
    } catch (err) {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2>Admin Login</h2>
        <p>Restricted access for content management.</p>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter admin password (admin123)"
              required 
            />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      </div>
    </main>
  );
}
