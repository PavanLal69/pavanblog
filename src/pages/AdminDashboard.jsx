import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { useCourses } from '../context/CourseContext';
import { uploadFile } from '../api/blogApi';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { posts, addPost, editPost, removePost } = usePosts();
  const { courses, addCourse, editCourse, removeCourse } = useCourses();
  
  const [activeTab, setActiveTab] = useState('blogs');
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [blogForm, setBlogForm] = useState({
    title: '',
    description: '',
    category: 'My Posts',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800&h=600',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    level: 'Intermediate',
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
    modules: [],
    assignments: []
  });

  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'blogs') {
      setBlogForm(item);
    } else {
      setCourseForm({
        ...item,
        modules: item.modules || [],
        assignments: item.assignments || []
      });
    }
    setIsAdding(false);
  };

  const handleAdd = (tab) => {
    setActiveTab(tab);
    setIsAdding(true);
    setEditingItem(null);
    if (tab === 'blogs') {
      setBlogForm({
        title: '',
        description: '',
        category: 'My Posts',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800&h=600',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    } else {
      setCourseForm({
        title: '',
        description: '',
        level: 'Intermediate',
        duration: '8 Weeks',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
        modules: [],
        assignments: []
      });
    }
  };

  const handleFileUpload = async (e, moduleIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadFile(file);
      const newModules = [...courseForm.modules];
      newModules[moduleIndex] = { ...newModules[moduleIndex], file: result.filename };
      setCourseForm({ ...courseForm, modules: newModules });
      alert('File uploaded successfully!');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadFile(file);
      setBlogForm({ ...blogForm, image: result.url });
      alert('Image uploaded successfully!');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDescriptionImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadFile(file);
      const imageTag = `\n[IMG: ${result.url}]\n`;
      setBlogForm({ ...blogForm, description: blogForm.description + imageTag });
      alert('Image added to description!');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const addModuleRow = () => {
    const newModule = { id: Date.now(), title: '', file: '' };
    setCourseForm({ ...courseForm, modules: [...courseForm.modules, newModule] });
  };

  const removeModuleRow = (id) => {
    setCourseForm({ ...courseForm, modules: courseForm.modules.filter(m => m.id !== id) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'blogs') {
      if (editingItem) {
        await editPost(editingItem.id, blogForm);
      } else {
        await addPost(blogForm);
      }
    } else {
      if (editingItem) {
        await editCourse(editingItem.id, courseForm);
      } else {
        await addCourse(courseForm);
      }
    }
    setEditingItem(null);
    setIsAdding(false);
  };

  return (
    <main className={styles.adminPage}>
      <div className="container">
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div className={styles.headerActions}>
            <button onClick={() => { setIsAdding(false); setEditingItem(null); setActiveTab(activeTab === 'blogs' ? 'courses' : 'blogs'); }} className={styles.tabSwitch}>
              Switch to {activeTab === 'blogs' ? 'Courses' : 'Blogs'}
            </button>
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
          </div>
        </div>
        
        <p className={styles.intro}>
          Currently Managing: <strong>{activeTab.toUpperCase()}</strong>
        </p>

        {(isAdding || editingItem) ? (
          <div className={styles.editorForm}>
            <h3>{editingItem ? 'Edit ' : 'Add New '}{activeTab === 'blogs' ? 'Post' : 'Course'}</h3>
            <form onSubmit={handleSubmit}>
              {activeTab === 'blogs' ? (
                <>
                  <div className={styles.formGroup}>
                    <label>Title</label>
                    <input type="text" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} required />
                  </div>
                  <div className={styles.formGroup}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ margin: 0 }}>Description</label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleDescriptionImageUpload}
                          id="desc-image-upload"
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="desc-image-upload" className={styles.uploadLabel} style={{ fontSize: '0.8rem', padding: '4px 8px', margin: 0 }}>
                          {uploading ? '...' : '+ Insert Image'}
                        </label>
                      </div>
                    </div>
                    <textarea value={blogForm.description} onChange={(e) => setBlogForm({...blogForm, description: e.target.value})} rows="8" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Category</label>
                    <input type="text" value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Image URL</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input type="text" value={blogForm.image} onChange={(e) => setBlogForm({...blogForm, image: e.target.value})} required style={{ flex: 1 }} />
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="blog-image-upload"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="blog-image-upload" className={styles.uploadLabel}>
                        {uploading ? '...' : 'Upload Image'}
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.courseMainFields}>
                    <div className={styles.formGroup}>
                      <label>Course Title</label>
                      <input type="text" value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Description</label>
                      <textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} rows="4" required />
                    </div>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Level</label>
                        <input type="text" value={courseForm.level} onChange={(e) => setCourseForm({...courseForm, level: e.target.value})} required />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Duration</label>
                        <input type="text" value={courseForm.duration} onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})} required />
                      </div>
                    </div>
                  </div>

                  <div className={styles.modulesSection}>
                    <h4>Manage Modules (PPT Uploads)</h4>
                    {courseForm.modules.map((module, index) => (
                      <div key={module.id} className={styles.moduleRow}>
                        <input 
                          type="text" 
                          placeholder="Module Title" 
                          value={module.title} 
                          onChange={(e) => {
                            const newModules = [...courseForm.modules];
                            newModules[index].title = e.target.value;
                            setCourseForm({ ...courseForm, modules: newModules });
                          }}
                        />
                        <div className={styles.fileUpload}>
                          <span>{module.file || 'No file uploaded'}</span>
                          <input 
                            type="file" 
                            accept=".pptx,.ppt" 
                            onChange={(e) => handleFileUpload(e, index)}
                            id={`file-${module.id}`}
                            style={{ display: 'none' }}
                          />
                          <label htmlFor={`file-${module.id}`} className={styles.uploadLabel}>
                            {uploading ? '...' : 'Upload PPT'}
                          </label>
                        </div>
                        <button type="button" onClick={() => removeModuleRow(module.id)} className={styles.removeBtn}>&times;</button>
                      </div>
                    ))}
                    <button type="button" onClick={addModuleRow} className={styles.addBtn}>+ Add Module</button>
                  </div>
                </>
              )}
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveBtn} disabled={uploading}>Save {activeTab === 'blogs' ? 'Post' : 'Course'}</button>
                <button type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }} className={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className={styles.dashboardGrid}>
              <div className={styles.card}>
                <h3>Manage Posts</h3>
                <p>Create new news articles or edit existing ones.</p>
                <button className={styles.actionButton} onClick={() => handleAdd('blogs')}>Add New Post</button>
              </div>
              
              <div className={styles.card}>
                <h3>Manage Courses</h3>
                <p>Update your course list and upload PPT modules.</p>
                <button className={styles.actionButton} onClick={() => handleAdd('courses')}>Add New Course</button>
              </div>

              <div className={styles.card}>
                <h3>Edit About Page</h3>
                <p>Update your resume, publications, and experience.</p>
                <button className={styles.actionButton}>Edit About</button>
              </div>
            </div>

            <div className={styles.postList}>
              <h3>Current {activeTab === 'blogs' ? 'Posts' : 'Courses'}</h3>
              {(activeTab === 'blogs' ? posts : courses).map(item => (
                <div key={item.id} className={styles.postItem}>
                  <span>{item.title}</span>
                  <div className={styles.postActions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => (activeTab === 'blogs' ? removePost(item.id) : removeCourse(item.id))}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
