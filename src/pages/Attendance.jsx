import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const { canEdit, canDelete } = useAuth();

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = () => {
    const data = storage.get('attendance', []);
    setAttendance(data);
  };

  const handleAdd = (formData) => {
    const newAttendance = {
      id: attendance.length + 1,
      ...formData
    };
    const updated = [...attendance, newAttendance];
    setAttendance(updated);
    storage.set('attendance', updated);
  };

  const handleEdit = (id, formData) => {
    const updated = attendance.map(a => a.id === id ? { ...a, ...formData } : a);
    setAttendance(updated);
    storage.set('attendance', updated);
  };

  const handleDelete = (id) => {
    const updated = attendance.filter(a => a.id !== id);
    setAttendance(updated);
    storage.set('attendance', updated);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Talaba', accessor: 'student', required: true },
    { header: 'Kurs', accessor: 'course', required: true },
    { header: 'Sana', accessor: 'date', type: 'date', required: true },
    {
      header: 'Status',
      accessor: 'status',
      type: 'select',
      options: ['present', 'absent', 'late'],
      render: (value) => (
        <span className={`status-badge ${value}`}>
          {value === 'present' ? '✓ Bor' : value === 'absent' ? '✗ Yo\'q' : '⏰ Kech'}
        </span>
      )
    }
  ];

  return (
    <DataTable
      title="Davomat"
      data={attendance}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      canEdit={canEdit()}
      canDelete={canDelete()}
    />
  );
};

export default Attendance;
