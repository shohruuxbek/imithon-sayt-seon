import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { canEdit, canDelete } = useAuth();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const data = storage.get('courses', []);
    setCourses(data);
  };

  const handleAdd = (formData) => {
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      status: 'active'
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    storage.set('courses', updated);
  };

  const handleEdit = (id, formData) => {
    const updated = courses.map(c => c.id === id ? { ...c, ...formData } : c);
    setCourses(updated);
    storage.set('courses', updated);
  };

  const handleDelete = (id) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    storage.set('courses', updated);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Kurs nomi', accessor: 'name', required: true },
    { header: 'O\'qituvchi', accessor: 'teacher', required: true },
    { header: 'Davomiyligi', accessor: 'duration', required: true },
    { 
      header: 'Narxi (so\'m)', 
      accessor: 'price', 
      type: 'number',
      required: true,
      render: (value) => `${value.toLocaleString()} so'm`
    },
    { header: 'Talabalar soni', accessor: 'students', type: 'number' },
    {
      header: 'Status',
      accessor: 'status',
      type: 'select',
      options: ['active', 'inactive'],
      render: (value) => (
        <span className={`status-badge ${value}`}>
          {value === 'active' ? 'Faol' : 'Nofaol'}
        </span>
      )
    }
  ];

  return (
    <DataTable
      title="Kurslar"
      data={courses}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      canEdit={canEdit()}
      canDelete={canDelete()}
    />
  );
};

export default Courses;
