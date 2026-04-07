import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(formData.username, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } else {
      const result = register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>SEON AKADEMIY</h1>
          <p>O'quv markazi boshqaruv tizimi</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            <LogIn size={18} />
            Kirish
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            <UserPlus size={18} />
            Ro'yxatdan o'tish
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label>Ism</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ismingizni kiriting"
              />
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Username kiriting"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password kiriting"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Rol</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn-primary">
            {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo foydalanuvchilar:</h4>
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>Teacher:</strong> teacher1 / teacher123</p>
          <p><strong>Student:</strong> student1 / student123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
