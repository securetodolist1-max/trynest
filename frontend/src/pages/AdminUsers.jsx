import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/AdminUsers.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser);
    
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    console.log('Parsed user:', parsedUser);
    
    if (parsedUser.role !== 'ADMIN') {
      console.log('User is not admin, redirecting...');
      navigate('/dashboard');
      return;
    }
    
    setUser(parsedUser);
    console.log('Fetching users...');
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Making API call to /admin/users');
      const res = await api.get('/admin/users');
      console.log('API Response received:', res);
      console.log('Response data:', res.data);
      console.log('Number of users:', res.data ? res.data.length : 0);
      
      if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);
        console.log('Users set to:', res.data);
      } else {
        console.error('Response data is not an array:', res.data);
        setError('Invalid response format from server');
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      console.error('Error details:', err.response);
      setError(`Failed to load users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone!`)) {
      return;
    }
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      alert(`User "${userName}" has been deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  const filteredUsers = users.filter(u =>
    (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="admin-container"><p>Loading users...</p></div>;
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>👥 Admin - Users Management</h1>
        <div className="admin-actions">
          <span>Logged in as: {user?.name}</span>
          <button onClick={handleRefresh} className="btn-refresh" title="Refresh users list">
            🔄 Refresh
          </button>
          <button onClick={handleBackToDashboard} className="btn-back">
            ← Back to Dashboard
          </button>
        </div>
      </header>

      <main className="admin-main">
        {error && <div style={{color: 'red', padding: '1rem', backgroundColor: '#ffe6e6', borderRadius: '0.5rem'}}>{error}</div>}
        
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="user-count">Total Users: {users.length} | Filtered: {filteredUsers.length}</span>
        </div>

        <div className="users-table-wrapper">
          {users.length === 0 ? (
            <div style={{padding: '2rem', textAlign: 'center', color: '#999'}}>
              <p>No users found in system</p>
              <p style={{fontSize: '0.9rem'}}>Total users: {users.length}</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name || 'N/A'}</td>
                      <td>{u.email || 'N/A'}</td>
                      <td><span className={`role-badge ${(u.role || 'user').toLowerCase()}`}>{u.role || 'USER'}</span></td>
                      <td><span className={`verified-badge ${u.verified ? 'verified' : 'unverified'}`}>{u.verified ? '✓ Yes' : '✗ No'}</span></td>
                      <td><span className={`status-badge ${u.locked ? 'locked' : 'active'}`}>{u.locked ? 'Locked' : 'Active'}</span></td>
                      <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="action-buttons">
                        {u.role !== 'ADMIN' && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="btn-delete"
                            title="Delete user"
                          >
                            🗑️ Delete
                          </button>
                        )}
                        {u.role === 'ADMIN' && (
                          <span className="admin-protected">Protected</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-results">No users match your search</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
