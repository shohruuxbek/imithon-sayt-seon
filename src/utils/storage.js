// localStorage utility functions
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
};

// Initialize demo data if not exists
export const initializeDemoData = () => {
  if (!storage.get('users')) {
    storage.set('users', [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' }
    ]);
  }

  if (!storage.get('students')) {
    storage.set('students', [
      { id: 1, name: 'Ali Valiyev', phone: '+998901234567', email: 'ali@example.com', course: 'Matematika', status: 'active' },
      { id: 2, name: 'Zarina Karimova', phone: '+998912345678', email: 'zarina@example.com', course: 'Ingliz tili', status: 'active' },
      { id: 3, name: 'Bobur Hasanov', phone: '+998923456789', email: 'bobur@example.com', course: 'Fizika', status: 'inactive' }
    ]);
  }

  if (!storage.get('teachers')) {
    storage.set('teachers', [
      { id: 1, name: 'Prof. Ahmadjonov', phone: '+998901111111', email: 'ahmad@example.com', subject: 'Matematika', experience: 15 },
      { id: 2, name: 'Dr. Sultonova', phone: '+998912222222', email: 'sultonova@example.com', subject: 'Ingliz tili', experience: 10 },
      { id: 3, name: 'Ustoz Rahimov', phone: '+998923333333', email: 'rahimov@example.com', subject: 'Fizika', experience: 8 }
    ]);
  }

  if (!storage.get('courses')) {
    storage.set('courses', [
      { id: 1, name: 'Matematika', teacher: 'Prof. Ahmadjonov', duration: '6 oy', price: 500000, students: 25, status: 'active' },
      { id: 2, name: 'Ingliz tili', teacher: 'Dr. Sultonova', duration: '8 oy', price: 600000, students: 30, status: 'active' },
      { id: 3, name: 'Fizika', teacher: 'Ustoz Rahimov', duration: '6 oy', price: 550000, students: 20, status: 'active' }
    ]);
  }

  if (!storage.get('payments')) {
    storage.set('payments', [
      { id: 1, student: 'Ali Valiyev', amount: 500000, date: '2026-04-01', type: 'Kurs to\'lovi', status: 'completed' },
      { id: 2, student: 'Zarina Karimova', amount: 600000, date: '2026-04-02', type: 'Kurs to\'lovi', status: 'completed' },
      { id: 3, student: 'Bobur Hasanov', amount: 550000, date: '2026-04-03', type: 'Kurs to\'lovi', status: 'pending' }
    ]);
  }

  if (!storage.get('attendance')) {
    storage.set('attendance', [
      { id: 1, student: 'Ali Valiyev', course: 'Matematika', date: '2026-04-07', status: 'present' },
      { id: 2, student: 'Zarina Karimova', course: 'Ingliz tili', date: '2026-04-07', status: 'present' },
      { id: 3, student: 'Bobur Hasanov', course: 'Fizika', date: '2026-04-07', status: 'absent' }
    ]);
  }
};
