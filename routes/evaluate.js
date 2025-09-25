const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { startEvaluation } = require('../services/evaluationService');
const router = express.Router();

router.post('/', (req, res) => {
  const { uploadId } = req.body;
  
  if (!uploadId || !global.uploads || !global.uploads.has(uploadId)) {
    return res.status(400).json({ error: 'Invalid or missing upload ID' });
  }

  const taskId = uuidv4();
  
  global.tasks = global.tasks || new Map();
  
  global.tasks.set(taskId, { status: 'queued', uploadId });

  startEvaluation(taskId).catch(err => {
    console.error('Evaluation failed to start:', err);
    let task = global.tasks.get(taskId);
    task.status = 'failed';
    global.tasks.set(taskId, task);
  });

  res.json({ id: taskId, status: 'queued' });
});

module.exports = router;
