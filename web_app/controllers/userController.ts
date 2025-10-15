import { Request, Response } from 'express';
import pool from '../db';

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            ["ssds", "dsds"]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};