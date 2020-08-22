require('dotenv').config();
let mongoDbURI: string;
if (process.env.NODE_ENV === 'production') {
	mongoDbURI = `${process.env.MONGO_URI}`;
} else {
	mongoDbURI = `${process.env.MONGO_URI}`;
}

export default mongoDbURI;
