import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  return (
    <article className={styles.card}>
      <Link to={`/post/${post.id}`} className={styles.imageLink}>
        <div className={styles.imageContainer}>
          <img src={post.image} alt={post.title} className={styles.image} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.tag}>{post.category}</span>
          <span className={styles.date}>{post.date}</span>
        </div>
        <h3 className={styles.title}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <p className={styles.description}>{post.description.replace(/\[IMG:\s*.*?\]/g, '').trim()}</p>
      </div>
    </article>
  );
}
