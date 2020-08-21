import React from 'react';
import Home from '../Home/Home';
import { useHistory } from 'react-router-dom';

interface User {
	email: string;
	password: string;
}

interface UserCredentials {
	username: string;
	email: string;
}

const SignIn: React.FC = () => {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
	const [userCredentials, setUserCredentials] = React.useState<UserCredentials>(
		{
			username: '',
			email: '',
		}
	);
	const history = useHistory();

	const signIn = async () => {
		const userSignIn: User = { email, password };

		const signIn = await fetch('http://localhost:5000/users/signin', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(userSignIn),
		});

		const response = await signIn.json();

		if (response[0]) {
			setIsSignedIn(true);
			setUserCredentials({
				username: response[0].username,
				email: response[0].email,
			});
		} else {
			alert('No such user credentials found :(');
		}
	};

	return (
		<>
			{isSignedIn ? (
				<Home
					email={userCredentials.email}
					username={userCredentials.username}
				/>
			) : (
				<div className='container mt-5'>
					<h1>Sign in</h1>
					<form className='form-group'>
						<label htmlFor='email' className='mt-5'>
							<h4>Email</h4>
						</label>
						<input
							onChange={e => {
								setEmail(e.target.value);
							}}
							name='email'
							type='email'
							className='form-control'
							required
						/>
						<label htmlFor='password'>
							<h4>Password</h4>
						</label>
						<input
							onChange={e => {
								setPassword(e.target.value);
							}}
							name='password'
							type='password'
							className='form-control'
							required
						/>
						<button
							onClick={e => {
								e.preventDefault();
								signIn();
							}}
							className='btn btn-primary btn-lg mt-3'
						>
							Sign in
						</button>
					</form>
					<p
						onClick={() => {
							history.push('/signup');
						}}
						className='mt-3'
					>
						Sign Up
					</p>
				</div>
			)}
		</>
	);
};

export default SignIn;
