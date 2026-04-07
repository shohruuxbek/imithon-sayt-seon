import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import DataTable from '../components/DataTable';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const { canEdit, canDelete } = useAuth();

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    const data = storage.get('payments', []);
    setPayments(data);
  };

  const handleAdd = (formData) => {
    const newPayment = {
      id: payments.length + 1,
      ...formData,
      status: 'pending'
    };
    const updated = [...payments, newPayment];
    setPayments(updated);
    storage.set('payments', updated);
  };

  const handleEdit = (id, formData) => {
    const updated = payments.map(p => p.id === id ? { ...p, ...formData } : p);
    setPayments(updated);
    storage.set('payments', updated);
  };

  const handleDelete = (id) => {
    const updated = payments.filter(p => p.id !== id);
    setPayments(updated);
    storage.set('payments', updated);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Talaba', accessor: 'student', required: true },
    { 
      header: 'Summa (so\'m)', 
      accessor: 'amount', 
      type: 'number',
      required: true,
      render: (value) => `${value.toLocaleString()} so'm`
    },
    { header: 'Sana', accessor: 'date', type: 'date', required: true },
    { header: 'Turi', accessor: 'type', required: true },
    {
      header: 'Status',
      accessor: 'status',
      type: 'select',
      options: ['completed', 'pending', 'cancelled'],
      render: (value) => (
        <span className={`status-badge ${value}`}>
          {value === 'completed' ? 'To\'langan' : value === 'pending' ? 'Kutilmoqda' : 'Bekor qilingan'}
        </span>
      )
    }
  ];

  return (
    <DataTable
      title="To'lovlar"
      data={payments}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      canEdit={canEdit()}
      canDelete={canDelete()}
    />
  );
};

export default Payments;
