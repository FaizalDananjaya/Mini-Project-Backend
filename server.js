const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/upload');
const evaluateRoute = require('./routes/evaluate');
const resultRoute = require('./routes/result');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/upload', uploadRoute);
app.use('/evaluate', evaluateRoute);
app.use('/result', resultRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
