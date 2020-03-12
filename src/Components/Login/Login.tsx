import React, { FormEvent, useState } from 'react'
import { Authorization } from '../../App'
import { AuthorizationState } from '../../Authorization'
import { Form, Button } from 'react-bootstrap'

interface LoginResponse {
	token: string,
}

const Login: React.FC = () => {
	const isAuth = Authorization.authorized !== AuthorizationState.AUTHORIZED
	let [user, setUser] = useState('')
	let [password, setPassword] = useState('')
	let [token, setToken] = useState<LoginResponse | null>(null)
	const [isSubmitting, setSubmit] = useState(false)

	const Authenticate = (e: FormEvent) => {
		e.preventDefault()
		setSubmit(true)

		// If positive, save token and use it for HTTP requests against pages?
		// It look more easy i'll just check once, if ok just save state otherwise error login page
		// Token should be used to check if user has the rights and it should be antitampered

		// Checks if input are not empty
		if (!!user.trim() && !!password.trim()) {
			// Check credentials against backend
			fetch('http://localhost:5000/login', {
				method: 'POST',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user: user,
					password: password
				})
			})
				.then(resp => resp.json())
				.then(data => {
					setToken(data)
					setSubmit(false)
				})
				.catch(err => console.error(err, 'Is server up and running?'))
		}
	}

	return (
		<div>
			{isAuth &&
				<Form onSubmit={Authenticate}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Username"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit" disabled={isSubmitting}>
						Submit
					</Button>
				</Form>
			}
		</div>
	)
}

export default Login