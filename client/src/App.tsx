import React from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = () => {
	return (
		<div className='container'>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/signin' />
				</Route>
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/home' component={Home} />
				<Route exact path='/signup' component={SignUp} />
			</Switch>
		</div>
	);
};

export default App;
