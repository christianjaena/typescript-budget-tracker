import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
	username: string;
	email: string;
}

const Home: React.FC<Props> = ({ username, email }) => {
	const history = useHistory();
	return (
		<>
			<h1>Hello World</h1>
			<h1>Welcome {username}</h1>
			<h2>Your Email is {email}</h2>
			<p
				onClick={() => {
					history.push('/');
				}}
			>
				Logout
			</p>
		</>
	);
};

export default Home;
