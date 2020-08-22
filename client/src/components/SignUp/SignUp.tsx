import React from 'react';
import { useHistory } from 'react-router-dom';

interface User {
	username: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const [username, setUsername] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const history = useHistory();

	const signUp = async () => {
		const user: User = { username, email, password };
		const signUpUser: Response = await fetch('/users/signup', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const response = await signUpUser.json();
		if (response[0]) {
			alert('Registered!');
			history.push('/signin');
		} else {
			alert('Duplicate!');
		}
	};

	return (
		<>
			<div className='text-left'>
				<h1 className='mt-5 text-center'>Sign Up</h1>
				<form className='form-group'>
					<label htmlFor='username' className='text-left mt-3'>
						<h4>Username</h4>
					</label>
					<input
						name='username'
						onChange={e => {
							setUsername(e.target.value);
						}}
						type='text'
						className='form-control'
						required
					/>
					<label htmlFor='email' className='text-left mt-3'>
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
					<label htmlFor='password' className='text-left mt-3'>
						<h4>Password</h4>
					</label>
					<input
						onChange={e => {
							setPassword(e.target.value);
						}}
						type='password'
						className='form-control'
					/>
					<button
						className='btn btn-primary btn-lg mt-4'
						type='submit'
						onClick={e => {
							e.preventDefault();
							signUp();
						}}
					>
						Sign Up
					</button>
				</form>
				<p
					onClick={() => {
						history.push('/');
					}}
					className='mt-3'
				>
					SignIn
				</p>
			</div>
		</>
	);
};

export default SignUp;
