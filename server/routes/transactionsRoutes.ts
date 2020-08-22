import express from 'express';
import {
	add_transaction,
	delete_transaction,
	get_transactions,
} from '../controllers/transactionsController';
const transactionsRoutes = express.Router();

transactionsRoutes.get('/', get_transactions);
transactionsRoutes.post('/', add_transaction);
transactionsRoutes.delete('/:id', delete_transaction);

export default transactionsRoutes;
