const express = require('express');
const multer = require('multer');
const { parseFileContent } = require('../utils/fileParser');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'project_report', maxCount: 1 }
]), async (req, res) => {
  try {
    let files = req.files;
    if (!files.cv || !files.project_report) {
      return res.status(400).json({ error: 'Both CV and project report are required' });
    }

    let cvText = await parseFileContent(files.cv[0]);
    let projectText = await parseFileContent(files.project_report[0]);

    const uploadId = require('uuid').v4();
    global.uploads = global.uploads || new Map();
    global.uploads.set(uploadId, { cv: cvText, project: projectText });

    res.json({ id: uploadId, message: 'Files uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process files' });
  }
});

module.exports = router;
