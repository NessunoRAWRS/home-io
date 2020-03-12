import React from 'react';
import { Toast } from 'react-bootstrap';

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				<h3>Dashboard</h3>

				<Toast show={true} onClose={() => { }}>
					<Toast.Header>
						<strong className="mr-auto">Dashboard Box</strong>
						<small>11 minuti fa</small>
					</Toast.Header>
					<Toast.Body>
						Questo è un box di esempio.. Utilizzarlo come Box per la dashboard o come notificatore?<br />
						Sembrerebbe più per notifiche..
					</Toast.Body>
				</Toast>
			</div>);
	}
}

export default Dashboard;