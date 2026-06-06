import { useState } from 'react';
import '../styles/AddTaskForm.css';

export default function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>✨ Add New Task</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Task description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>
      <button type="submit" className="btn-primary">
        Add Task
      </button>
    </form>
  );
}
