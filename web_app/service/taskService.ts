import { Request, Response } from 'express';
import { Pool } from 'pg';


export class TaskService {
    constructor(private db: Pool) {
  }

  createTask = async (req: Request, res: Response) => {
    try {
      const result = await this.db.query(
        'INSERT INTO task (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [req.body.user_id, req.body.title, req.body.description]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  }
}
