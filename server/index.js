const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
