import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const { user, canEdit, canDelete } = useAuth();

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    const data = storage.get('teachers', []);
    setTeachers(data);
  };

  const handleEdit = (id, formData) => {
    const updated = teachers.map(t => t.id === id ? { ...t, ...formData } : t);
    setTeachers(updated);
    storage.set('teachers', updated);
  };

  const handleDelete = (id) => {
    const updated = teachers.filter(t => t.id !== id);
    setTeachers(updated);
    storage.set('teachers', updated);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Ism', accessor: 'name', required: true },
    { header: 'Telefon', accessor: 'phone', required: true },
    { header: 'Email', accessor: 'email', type: 'email' },
    { header: 'Fan', accessor: 'subject', required: true },
    { header: 'Tajriba (yil)', accessor: 'experience', type: 'number', required: true }
  ];

  // Faqat admin o'qituvchilarni boshqara oladi
  const isAdmin = user?.role === 'admin';

  return (
    <DataTable
      title="O'qituvchilar"
      data={teachers}
      columns={columns}
      onEdit={handleEdit}
      onDelete={handleDelete}
      canEdit={isAdmin && canEdit()}
      canDelete={isAdmin && canDelete()}
    />
  );
};

export default Teachers;
