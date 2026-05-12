import PostCard from './PostCard';
import styles from './PostGrid.module.css';

export default function PostGrid({ posts, title }) {
  return (
    <section className={styles.gridSection}>
      <div className="container">
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
        <div className={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className={styles.viewAllContainer}>
          <a href="#" className={styles.viewAll}>View all news &rarr;</a>
        </div>
      </div>
    </section>
  );
}
