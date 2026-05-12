import FeaturedPost from '../components/FeaturedPost';
import PostGrid from '../components/PostGrid';
import { usePosts } from '../context/PostContext';

export default function Home() {
  const { posts, loading, error } = usePosts();

  if (loading) return <div className="container" style={{ padding: '4rem 2rem' }}>Loading posts...</div>;
  if (error) return <div className="container" style={{ padding: '4rem 2rem', color: 'red' }}>Error: {error}</div>;

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const latestNews = posts.length > 1 ? posts.slice(1) : [];

  return (
    <main>
      {featuredPost && <FeaturedPost post={featuredPost} />}
      {latestNews.length > 0 ? (
        <PostGrid posts={latestNews} title="Latest Posts" />
      ) : (
        !featuredPost && <div className="container" style={{ padding: '4rem 2rem' }}>No posts found.</div>
      )}
    </main>
  );
}
