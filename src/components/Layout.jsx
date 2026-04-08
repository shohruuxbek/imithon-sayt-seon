import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  ClipboardCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import logoImage from '../assets/logo.jpg';

const Layout = () => {
  const { user, logout, canEdit, canDelete } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'teacher', 'student'] },
    { path: '/students', icon: Users, label: 'Talabalar', roles: ['admin', 'teacher', 'student'] },
    { path: '/teachers', icon: GraduationCap, label: 'O\'qituvchilar', roles: ['admin', 'teacher', 'student'] },
    { path: '/courses', icon: BookOpen, label: 'Kurslar', roles: ['admin', 'teacher', 'student'] },
    { path: '/payments', icon: CreditCard, label: 'To\'lovlar', roles: ['admin', 'teacher'] },
    { path: '/attendance', icon: ClipboardCheck, label: 'Davomat', roles: ['admin', 'teacher'] }
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src={logoImage} alt="SEON Logo" className="logo-image" />
          </div>
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0)}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {filteredMenu.map(item => (
            <button
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Chiqish</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
