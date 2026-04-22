import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/tasks', { headers });
      setTasks(res.data.tasks);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const handleCreate = async () => {
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/v1/tasks', form, { headers });
      setSuccess('Task created!');
      setForm({ title: '', description: '', priority: 'medium' });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, { headers });
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="dashboard">
      <div className="navbar">
        <span>👋 Hello, {user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="task-form">
        <h2>Create New Task</h2>
        <br />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          placeholder="Task Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description (optional)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
          style={{ width: '100%', padding: '12px', marginBottom: '16px',
            border: '1px solid #ddd', borderRadius: '6px' }}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button onClick={handleCreate}>Add Task</button>
      </div>

      <div className="task-list">
        <h2 style={{ marginBottom: '16px' }}>
          My Tasks ({tasks.length})
        </h2>
        {tasks.length === 0 && (
          <p style={{ color: '#888' }}>No tasks yet. Create one above!</p>
        )}
        {tasks.map(task => (
          <div className="task-card" key={task._id}>
            <div>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p style={{ marginTop: '4px' }}>
                Priority: <strong>{task.priority}</strong>
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className={`badge ${task.status}`}>{task.status}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;