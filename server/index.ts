import express, { Application, Request, Response, response } from 'express';
import route from './routes/usersRoutes';
import mongoose from 'mongoose';
import mongoDbURI from './mongoConnection';
import Transaction from './models/TransanctionModel';
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app: Application = express();

// * Mongo DB * //

mongoose
	.connect(mongoDbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('Mongo DB connected');
		app.listen(PORT, () => {
			console.log(`Server running at port: ${PORT}`);
		});
	})
	.catch(err => console.log(err.message));

// * MIDDLEWARES * //

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/public'));
} else {
	const morgan = require('morgan');
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

// * ROUTES * //
app.get('/transactions', async (req: Request, res: Response) => {
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
});

app.post('/transactions', async (req: Request, res: Response) => {
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
});

app.delete('/transactions/:id', async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		Transaction.findByIdAndDelete(id)
			.then(result => res.json(result))
			.catch(err => console.log(err));
	} catch (err) {
		console.error(err.message);
	}
});

app.use('/users', route);

// ? CATCH ALL ? //

app.get('*', (req, res) => {
	res.sendFile('/client/build/index.html');
})