import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Students = () => {
  const [students, setStudents] = useState([]);
  const { canEdit, canDelete } = useAuth();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const data = storage.get('students', []);
    setStudents(data);
  };

  const handleAdd = (formData) => {
    const newStudent = {
      id: students.length + 1,
      ...formData,
      status: 'active'
    };
    const updated = [...students, newStudent];
    setStudents(updated);
    storage.set('students', updated);
  };

  const handleEdit = (id, formData) => {
    const updated = students.map(s => s.id === id ? { ...s, ...formData } : s);
    setStudents(updated);
    storage.set('students', updated);
  };

  const handleDelete = (id) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    storage.set('students', updated);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Ism', accessor: 'name', required: true },
    { header: 'Telefon', accessor: 'phone', required: true },
    { header: 'Email', accessor: 'email', type: 'email' },
    { header: 'Kurs', accessor: 'course', required: true },
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
      title="Talabalar"
      data={students}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      canEdit={canEdit()}
      canDelete={canDelete()}
    />
  );
};

export default Students;
