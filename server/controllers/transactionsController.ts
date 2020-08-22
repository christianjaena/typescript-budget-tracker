import { Request, Response } from 'express';
import Transaction from '../models/TransanctionModel';

export const get_transactions = async (req: Request, res: Response) => {
	try {
		Transaction.find()
			.sort({ createdAt: -1 })
			.then(result => {
				res.json(result);
			})
			.catch(err => console.log(err));
	} catch (err) {
		console.error(err.message);
	}
};

export const add_transaction = async (req: Request, res: Response) => {
	try {
		const addTransaction: { amount: number; description: string } = req.body;
		const transaction = new Transaction(addTransaction);
		transaction
			.save()
			.then(result => {
				res.json(result);
			})
			.catch(err => console.log(err));
	} catch (err) {
		console.error(err.message);
	}
};

export const delete_transaction = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		Transaction.findByIdAndDelete(id)
			.then(result => res.json(result))
			.catch(err => console.log(err));
	} catch (err) {
		console.error(err.message);
	}
};
