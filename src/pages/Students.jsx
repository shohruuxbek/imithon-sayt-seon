import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Students = () => {
  const [students, setStudents] = useState([]);
  const { user, canEdit, canDelete } = useAuth();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const data = storage.get('students', []);
    // O'qituvchi faqat o'z guruhidagi o'quvchilarni ko'radi
    if (user?.role === 'teacher') {
      const teacherData = storage.get('teachers', []);
      const currentTeacher = teacherData.find(t => t.name === user?.name);
      if (currentTeacher) {
        return setStudents(data.filter(s => s.course === currentTeacher.subject));
      }
    }
    setStudents(data);
  };

  const handleAdd = (formData) => {
    // Telefon raqamidan login yaratish
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    const username = cleanPhone.length >= 9 ? cleanPhone.substring(cleanPhone.length - 9) : cleanPhone;
    const password = Math.random().toString(36).slice(-8); // Random parol
    
    const newStudent = {
      id: students.length + 1,
      ...formData,
      status: 'active',
      login: username,
      password: password
    };
    const updated = [...students, newStudent];
    setStudents(updated);
    storage.set('students', updated);

    // O'quvchini users'ga ham qo'shamiz (tizimga kirishi uchun)
    const users = storage.get('users', []);
    users.push({
      id: users.length + 1,
      username: username,
      password: password,
      role: 'student',
      name: formData.name
    });
    storage.set('users', users);

    // Login ma'lumotlarini ko'rsatish
    alert(`O'quvchi qo'shildi!\n\nLogin: ${username}\nParol: ${password}\n\nBu ma'lumotlarni o'quvchiga bering!`);
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
