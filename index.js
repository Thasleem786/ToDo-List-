const express = require('express');
const cors = require('cors');
const tasksRoute = require('./routes/tasks');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
