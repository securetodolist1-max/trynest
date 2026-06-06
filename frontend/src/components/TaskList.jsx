import { useState } from 'react';
import '../styles/TaskList.css';

export default function TaskList({ tasks, onDeleteTask, onToggleTask, onUpdateTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSave = (taskId) => {
    onUpdateTask(taskId, {
      title: editTitle,
      description: editDescription,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleCompleteTask = (taskId) => {
    onToggleTask(taskId);
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>📭 No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>📌 Your Tasks ({tasks.length})</h2>
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {editingId === task.id ? (
            <div className="task-edit">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows="2"
              />
              <div className="task-actions">
                <button onClick={() => handleSave(task.id)} className="btn-save">
                  Save
                </button>
                <button onClick={handleCancel} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="task-checkbox"
                />
                <div className="task-text">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  {task.completed && <span className="task-completed-badge">✓ Completed</span>}
                </div>
              </div>
              <div className="task-actions">
                {!task.completed && (
                  <button onClick={() => handleCompleteTask(task.id)} className="btn-complete">
                    ✓ Complete
                  </button>
                )}
                <button onClick={() => handleEdit(task)} className="btn-edit">
                  ✏️ Edit
                </button>
                <button onClick={() => onDeleteTask(task.id)} className="btn-delete">
                  🗑️ Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
