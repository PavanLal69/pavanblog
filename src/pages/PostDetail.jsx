import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, loading } = usePosts();
  
  const post = posts.find(p => String(p.id) === String(id));

  if (loading) return <div className="container" style={{ padding: '4rem 2rem' }}>Loading post...</div>;
  if (!post) return <div className="container" style={{ padding: '4rem 2rem' }}>Post not found. <button onClick={() => navigate('/')}>Go back</button></div>;

  return (
    <article className={styles.postPage}>
      <div className={styles.hero}>
        <img src={post.image} alt={post.title} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <div className="container">
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>Published on {post.date}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className={styles.content}>
          <div className={styles.body}>
            {post.description.split('\n').map((paragraph, index) => {
              const imgMatch = paragraph.match(/^\[IMG:\s*(.*?)\]$/);
              if (imgMatch) {
                return (
                  <div key={index} style={{ margin: '2rem 0', textAlign: 'center' }}>
                    <img src={imgMatch[1]} alt="Post visual" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                  </div>
                );
              }
              return paragraph.trim() ? <p key={index}>{paragraph}</p> : null;
            })}
          </div>
          
          <div className={styles.actions}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>
              &larr; Back to News
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
