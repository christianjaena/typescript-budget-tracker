import express, { Application } from 'express';
import usersRoutes from './routes/usersRoutes';
import transactionsRoutes from './routes/transactionsRoutes'
import mongoose from 'mongoose';
import mongoDbURI from './mongoConnection';
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

app.use('/transactions', transactionsRoutes)
app.use('/users', usersRoutes);

// ? CATCH ALL ? //

app.get('*', (req, res) => {
	res.sendFile('../client/build/index.html');
})