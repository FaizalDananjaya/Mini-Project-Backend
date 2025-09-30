const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const evaluateRoute = require('./routes/evaluate');
const resultRoute = require('./routes/result');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Candidate Evaluation API is running',
    endpoints: {
      upload: 'POST /upload - Upload CV and project report',
      evaluate: 'POST /evaluate - Start evaluation',
      result: 'GET /result/{id} - Get evaluation result'
    }
  });
});

app.use('/upload', uploadRoute);
app.use('/evaluate', evaluateRoute);
app.use('/result', resultRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
