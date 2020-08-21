import express, { Application } from 'express';
import route from './server/routes/usersRoutes'; 
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app: Application = express();

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

app.use('/users', route);

app.listen(PORT, () => {
	console.log(`Server running at port: ${PORT}`);
});
