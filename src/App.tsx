import React, { useState, useEffect } from 'react'
import { hasRole, IUser, AuthorizationState, UserRoles } from './Authorization'
import Login from './Components/Login'
import Admin from './Components/Admin'
import Dashboard from './Components/Dashboard'
import Garbage, { IGarbageData } from './Components/Garbage'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Navbar, Nav, Breadcrumb, Alert, AlertProps } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss'


export interface IAuthorization {
	authorized: AuthorizationState,
	token: string | null,
}
export const Authorization: IAuthorization = {
	authorized: AuthorizationState.AUTHORIZED,
	// authorized: AuthorizationState.NOT_AUTHORIZED,
	token: null
}

export type BootstrapVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
export const Popup: React.FC<{ message: string, variant: BootstrapVariant, title: string | null }> = (props) => {
	const [show, setShow] = useState(true)

	if (show) {
		return (
			<Alert variant={props.variant} onClick={() => setShow(false)} dismissible>
				<Alert.Heading>{props.title || 'Oh snap! You got an error'}</Alert.Heading>
				<p>{props.message}</p>
			</Alert>
		)
	}

	return null
}

export const App: React.FC = () => {
	// Manages error showing
	const [APIError, setAPIError] = useState(false)

	// TODO: webservice and db storage?
	// Example user that should be loaded after login
	// In a real scenario it should be null as soon as the app starts
	const user: IUser = {
		name: 'Cristian',
		roles: [UserRoles.ADMIN],
	}

	// Load data from db, if we gonna use one
	// We should, since data needs to be stored somewhere eventually
	// keeping them into this files is a no-no:
	// 1 - Code needs to be recompiled if any change happens
	// 2 - No real source of data
	const [garbageData, setGarbageData] = useState<IGarbageData[]>([{ day: '', garbage: [] }])

	// useEffect should be used one for each operation needed
	useEffect(() => {
		// Load data from API for garbage data
		fetch('http://localhost:5000/garbage')
			.then(resp => resp.json())
			.then((data: IGarbageData[]) => {
				setGarbageData(data)
			})
			.catch(err => {
				setAPIError(true)
			})
	}, [])

	return (
		<div className="App">
			<Router>
				<Navbar className="header" bg="light" expand="lg">
					<Navbar.Brand href="/">Home.io</Navbar.Brand>
					<Nav className="ml-auto menu">
						<Link to='/'>Dashboard</Link>
						<Link to='/garbage'>Spazzatura</Link>
						{(Authorization.authorized === AuthorizationState.AUTHORIZED && hasRole(user, [UserRoles.ADMIN])) && <Link to='/admin'>Admin</Link>}
					</Nav>
				</Navbar>

				<Breadcrumb>
					<Breadcrumb.Item href="">Home</Breadcrumb.Item>
					<Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
				</Breadcrumb>

				<Container>
					<div style={{
						position: 'absolute',
						zIndex: 99,
						top: '40%',
						left: '40%'
					}}>
						{APIError && <Popup message='Failed to retrieve data from API, is it running?' variant='danger' title={null} />}
					</div>
					{Authorization.authorized === AuthorizationState.NOT_AUTHORIZED && <Login />}
					{Authorization.authorized === AuthorizationState.AUTHORIZED && <Route exact path='/' component={Dashboard} />}
					{Authorization.authorized === AuthorizationState.AUTHORIZED && <Route path='/garbage' component={() => <Garbage data={garbageData} />} />}
					{(Authorization.authorized === AuthorizationState.AUTHORIZED && hasRole(user, [UserRoles.ADMIN])) && <Route path='/admin' component={Admin} />}
				</Container>
			</Router>
		</div>
	)
}

export default App
