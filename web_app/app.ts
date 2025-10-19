import express from 'express';
import { TaskService } from './service/taskService'
import pool from './db';

const app = express();
app.use(express.json());
const PORT = 3000;
let taskService = new TaskService(pool);

app.get('/', (req, res) => {
    res.send('Welcome to my site');
});
app.post('/task', taskService.createTask);

// Start application server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;