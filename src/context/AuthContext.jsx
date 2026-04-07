import { createContext, useContext, useState, useEffect } from 'react';
import { storage, initializeDemoData } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDemoData();
    const currentUser = storage.get('currentUser');
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const users = storage.get('users', []);
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      storage.set('currentUser', userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: 'Username yoki password noto\'g\'ri' };
  };

  const register = (userData) => {
    const users = storage.get('users', []);
    const existingUser = users.find(u => u.username === userData.username);
    
    if (existingUser) {
      return { success: false, message: 'Bu username allaqachon mavjud' };
    }

    const newUser = {
      id: users.length + 1,
      ...userData,
      role: userData.role || 'student'
    };

    users.push(newUser);
    storage.set('users', users);

    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    storage.set('currentUser', userWithoutPassword);

    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    storage.remove('currentUser');
  };

  const canEdit = () => {
    return user && (user.role === 'admin' || user.role === 'teacher');
  };

  const canDelete = () => {
    return user && user.role === 'admin';
  };

  if (loading) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, canEdit, canDelete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
