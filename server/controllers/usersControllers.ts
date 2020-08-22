import { Request, Response } from 'express';
import User from '../interfaces/User.interface.js';
import pool from '../../pgConnection.js';

export const userSignIn = async (req: Request, res: Response) => {
	try {
		const { email, password }: User = req.body;
		const findUser = await pool.query(
			`SELECT username, email FROM users WHERE email = $1 AND password = $2`,
			[email, password]
		);
		res.json(findUser.rows);
	} catch (err) {
		console.error(err.message);
	}
};

export const userSignUp = async (req: Request, res: Response) => {
	try {
		const { username, email, password }: User = req.body;
		const findDuplicate = await pool.query(
			'SELECT * FROM users WHERE username = $1 OR email = $2',
			[username, email]
		);
		if (!findDuplicate.rows[0]) {
			const addUser = await pool.query(
				'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *',
				[username, email, password]
			);
			res.json(addUser.rows);
		} else {
			res.json([]);
		}
	} catch (err) {
		console.error(err.message);
	}
};
