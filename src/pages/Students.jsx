import { useState, useEffect } from 'react';
import { storage, nextId } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Students = () => {
  const [students, setStudents] = useState([]);
  const { user, canEdit, canDelete } = useAuth();

  useEffect(() => {
    const data = storage.get('students', []);
    // O'qituvchi faqat o'z guruhidagi o'quvchilarni ko'radi
    if (user?.role === 'teacher') {
      const teacherData = storage.get('teachers', []);
      const currentTeacher = teacherData.find(t => t.name === user?.name);
      if (currentTeacher) {
        setStudents(data.filter(s => s.course === currentTeacher.subject));
        return;
      }
    }
    setStudents(data);
  }, [user]);

  const handleAdd = (formData) => {
    // Telefon raqamidan login yaratish
    const allStudents = storage.get('students', []);
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    const username = cleanPhone.length >= 9 ? cleanPhone.substring(cleanPhone.length - 9) : cleanPhone;
    const password = Math.random().toString(36).slice(-8); // Random parol
    
    const newStudent = {
      id: nextId(allStudents),
      status: 'active',
      ...formData,
      login: username,
      password: password
    };
    setStudents([...students, newStudent]);
    storage.set('students', [...allStudents, newStudent]);

    // O'quvchini users'ga ham qo'shamiz (tizimga kirishi uchun)
    const users = storage.get('users', []);
    users.push({
      id: nextId(users),
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
    const update = (list) => list.map(s => s.id === id ? { ...s, ...formData } : s);
    setStudents(update(students));
    storage.set('students', update(storage.get('students', [])));
  };

  const handleDelete = (id) => {
    const removed = students.find(s => s.id === id);
    setStudents(students.filter(s => s.id !== id));
    storage.set('students', storage.get('students', []).filter(s => s.id !== id));
    if (removed?.login) {
      storage.set('users', storage.get('users', []).filter(u => !(u.role === 'student' && u.username === removed.login)));
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id', editable: false },
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
