import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

const DataTable = ({ title, data, columns, onAdd, onEdit, onDelete, canEdit, canDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      onDelete(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      onEdit(editingItem.id, formData);
    } else {
      onAdd(formData);
    }
    setShowModal(false);
  };

  return (
    <div className="data-table-container">
      <div className="table-header">
        <h1>{title}</h1>
        <div className="table-actions">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {canEdit && (
            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} />
              Qo'shish
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
              {(canEdit || canDelete) && <th>Amallar</th>}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                  </td>
                ))}
                {(canEdit || canDelete) && (
                  <td className="actions">
                    {canEdit && (
                      <button className="btn-icon btn-edit" onClick={() => handleEdit(item)}>
                        <Edit size={16} />
                      </button>
                    )}
                    {canDelete && (
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Tahrirlash' : 'Yangi qo\'shish'}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              {columns.filter(col => col.editable !== false).map((col, idx) => (
                <div key={idx} className="form-group">
                  <label>{col.header}</label>
                  {col.type === 'select' ? (
                    <select
                      value={formData[col.accessor] || ''}
                      onChange={(e) => setFormData({ ...formData, [col.accessor]: e.target.value })}
                      required={col.required}
                    >
                      <option value="">Tanlang</option>
                      {col.options?.map((opt, optIdx) => (
                        <option key={optIdx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={col.type || 'text'}
                      value={formData[col.accessor] || ''}
                      onChange={(e) => setFormData({ ...formData, [col.accessor]: e.target.value })}
                      required={col.required}
                      placeholder={col.placeholder || ''}
                    />
                  )}
                </div>
              ))}
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-primary">
                  {editingItem ? 'Saqlash' : 'Qo\'shish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
