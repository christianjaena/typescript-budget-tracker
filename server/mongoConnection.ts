require('dotenv').config();

const mongoDbURI = `${process.env.MONGO_URI}`;

export default mongoDbURI;
