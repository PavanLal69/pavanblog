import { Link } from 'react-router-dom';
import styles from './FeaturedPost.module.css';

export default function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <section className={styles.featured}>
      <div className="container">
        <article className={styles.article}>
          <div className={styles.imageContainer}>
            <Link to={`/post/${post.id}`}>
              <img src={post.image} alt={post.title} className={styles.image} />
            </Link>
          </div>
          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.tag}>{post.category}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
            <h1 className={styles.title}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h1>
            <p className={styles.description}>{post.description.replace(/\[IMG:\s*.*?\]/g, '').trim()}</p>
            <Link to={`/post/${post.id}`} className={styles.readMore}>Read More &rarr;</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
