import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for an active mock session
    const session = localStorage.getItem('adminSession');
    if (session) {
      setUser({ role: 'admin', username: 'admin' });
    }
    setLoading(false);
  }, []);

  const login = (password) => {
    // Mock login logic - in reality, this would call Firebase/Supabase
    if (password === 'admin123') {
      const adminUser = { role: 'admin', username: 'admin' };
      setUser(adminUser);
      localStorage.setItem('adminSession', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminSession');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
