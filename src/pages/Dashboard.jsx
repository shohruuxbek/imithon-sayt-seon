import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    totalRevenue: 0,
    activeCourses: 0,
    attendanceRate: 0
  });

  useEffect(() => {
    const students = storage.get('students', []);
    const teachers = storage.get('teachers', []);
    const courses = storage.get('courses', []);
    const payments = storage.get('payments', []);
    const attendance = storage.get('attendance', []);

    const totalRevenue = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);

    const activeCourses = courses.filter(c => c.status === 'active').length;

    const presentCount = attendance.filter(a => a.status === 'present').length;
    const attendanceRate = attendance.length > 0 
      ? Math.round((presentCount / attendance.length) * 100) 
      : 0;

    setStats({
      students: students.length,
      teachers: teachers.length,
      courses: courses.length,
      totalRevenue,
      activeCourses,
      attendanceRate
    });
  }, []);

  const statCards = [
    {
      title: 'Jami Talabalar',
      value: stats.students,
      icon: Users,
      color: '#4CAF50'
    },
    {
      title: 'O\'qituvchilar',
      value: stats.teachers,
      icon: GraduationCap,
      color: '#2196F3'
    },
    {
      title: 'Kurslar',
      value: stats.courses,
      icon: BookOpen,
      color: '#FF9800'
    },
    {
      title: 'Jami Daromad',
      value: `${(stats.totalRevenue / 1000000).toFixed(1)}M so'm`,
      icon: DollarSign,
      color: '#9C27B0'
    },
    {
      title: 'Faol Kurslar',
      value: stats.activeCourses,
      icon: TrendingUp,
      color: '#E91E63'
    },
    {
      title: 'Davomat Foizi',
      value: `${stats.attendanceRate}%`,
      icon: CheckCircle,
      color: '#00BCD4'
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>O'quv markazi umumiy statistikasi</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="info-card">
          <h2>Xush kelibsiz!</h2>
          <p>SEON AKADEMIY boshqaruv tizimiga xush kelibsiz. Bu yerda siz talabalar, o'qituvchilar, kurslar, to'lovlar va davomatni boshqarishingiz mumkin.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
