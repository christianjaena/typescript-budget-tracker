-- CREATE DATABASE tsfs;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(20),
	email VARCHAR(50),
	password VARCHAR(50)
)
