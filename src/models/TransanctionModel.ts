import mongoose from 'mongoose';
const { Schema, model:Model } = mongoose;

const transactionSchema = new Schema(
	{
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Transaction = Model('Transaction', transactionSchema);

export default Transaction;
