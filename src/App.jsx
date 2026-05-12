import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import PostDetail from './pages/PostDetail';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { CourseProvider } from './context/CourseContext';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <CourseProvider>
          <Router>
            <div className="app-layout">
              <Navbar />
              <div className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/post/:id" element={<PostDetail />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  
                  {/* Protected Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
                <Footer />
              </div>
            </div>
          </Router>
        </CourseProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
