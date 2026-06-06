import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
      updateStats(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (taskList) => {
    const total = taskList.length;
    const completed = taskList.filter(task => task.completed).length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      const newTasks = [res.data, ...tasks];
      setTasks(newTasks);
      updateStats(newTasks);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
      updateStats(newTasks);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/toggle`);
      const newTasks = tasks.map((task) => (task.id === taskId ? res.data : task));
      setTasks(newTasks);
      updateStats(newTasks);
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const res = await api.patch(`/tasks/${taskId}`, updates);
      const newTasks = tasks.map((task) => (task.id === taskId ? res.data : task));
      setTasks(newTasks);
      updateStats(newTasks);
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📋 Task Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}! 👋</span>
          {user?.role === 'ADMIN' && (
            <>
              <button onClick={() => navigate('/admin/users')} className="btn-admin">
                👥 Manage Users
              </button>
              <a href="http://localhost:3002" target="_blank" rel="noopener noreferrer" className="btn-admin">
                📊 Admin Panel
              </a>
            </>
          )}
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Task Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card completed">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed ✓</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          {stats.total > 0 && (
            <div className="stat-card progress">
              <div className="stat-value">{Math.round((stats.completed / stats.total) * 100)}%</div>
              <div className="stat-label">Completion</div>
            </div>
          )}
        </div>

        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          onUpdateTask={handleUpdateTask}
        />
      </main>
    </div>
  );
}
