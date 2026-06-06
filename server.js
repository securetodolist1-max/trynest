const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

// Ready check endpoint
app.get('/ready', (req, res) => {
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString()
  });
});

// API endpoint
app.get('/api/version', (req, res) => {
  res.json({
    name: 'secure-todo-app',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Todos endpoint
app.get('/api/todos', (req, res) => {
  res.json({
    todos: [
      { id: 1, title: 'Setup CI/CD', completed: true },
      { id: 2, title: 'Deploy to production', completed: false }
    ]
  });
});

// Post todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  res.status(201).json({
    id: Date.now(),
    title: title || 'New Todo',
    completed: false,
    createdAt: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Secure Todo App Started              ║
║   Port: ${PORT}                              ║
║   Environment: ${NODE_ENV.toUpperCase()}${' '.repeat(20 - NODE_ENV.length)}║
║   Timestamp: ${new Date().toISOString()}║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
