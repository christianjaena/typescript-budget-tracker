import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
	username: string;
	email: string;
}

interface Transaction {
	_id: string;
	createdAt: string;
	amount: number;
	description: string;
}

const Home: React.FC<Props> = ({ username, email }) => {
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const [amount, setAmount] = React.useState<number>(0);
	const [description, setDescription] = React.useState<string>('');
	const history = useHistory();

	const addTransaction = async () => {
		const postApi = await fetch('/transactions', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ amount, description }),
		});
		const response = await postApi.json();
		setTransactions(prevTransactions => [response, ...prevTransactions]);
		setAmount(0);
		setDescription('');
	};

	const deleteTransaction = async (id: string) => {
		await fetch(`/transactions/${id}`, { method: 'DELETE' });
		setTransactions(prevTransactions =>
			prevTransactions.filter(transaction => transaction._id !== id)
		);
	};

	const getTransactions = async () => {
		const getApi = await fetch('/transactions');
		const data = await getApi.json();
		setTransactions(data);
	};

	React.useEffect(() => {
		getTransactions();
	}, []);

	return (
		<>
			<h3>Welcome {username}</h3>
			<h3>Your Email is {email}</h3>
			<p
				onClick={() => {
					history.push('/');
				}}
			>
				Logout
			</p>
			<label htmlFor='amount'>
				<h3>Amount</h3>
			</label>
			<input
				onChange={e => setAmount(Number(e.target.value))}
				type='number'
				value={amount}
				name='amount'
			/>
			<label htmlFor='description'>
				<h3>Description</h3>
			</label>
			<input
				onChange={e => setDescription(e.target.value)}
				type='text'
				name='description'
				value={description}
			/>
			<button className='btn btn-primary' onClick={addTransaction}>
				Add
			</button>
			{transactions.map((transaction, idx) => (
				<div key={idx}>
					<h3>{transaction.amount}</h3>
					<h4>{transaction.description}</h4>
					<p>{transaction.createdAt}</p>
					<button
						className='btn btn-warning'
						onClick={() => {
							deleteTransaction(transaction._id);
						}}
					>
						Delete
					</button>
				</div>
			))}
		</>
	);
};

export default Home;
