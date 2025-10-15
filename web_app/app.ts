import express, { NextFunction, Router } from 'express';
import { createUser } from './controllers/userController'

const app = express();
app.use(express.json());
const PORT = 3000;

app.use('/', createUser);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});