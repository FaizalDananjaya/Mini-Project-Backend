const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  
  if (!global.tasks || !global.tasks.has(taskId)) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const task = global.tasks.get(taskId);
  
  if (task.status === 'completed') {
    return res.json({
      id: taskId,
      status: 'completed',
      result: task.result
    });
  } else {
    return res.json({
      id: taskId,
      status: task.status
    });
  }
});

module.exports = router;
