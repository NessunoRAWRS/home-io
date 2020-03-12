import React from 'react'
import { Accordion, Card } from 'react-bootstrap'

// Keep a parent interface in case we need to add something new to pass as a prop
export interface IGarbageProps {
	data: IGarbageData[]
}

export interface IGarbageData {
	day: string,
	garbage: string[]
}

export const Garbage: React.FC<IGarbageProps> = (props) => {
	const days: string[] = [
		'Domenica',
		'Lunedì',
		'Martedì',
		'Mercoledì',
		'Giovedì',
		'Venerdì',
		'Sabato',
	]

	function getDate(): string {
		let date = new Date()
		let day = getDay(date)

		return `${day}, ${date.toLocaleDateString()}`
	}

	/**
	 * Retrieves the local string date, eg: getDay(1) return 'Lunedì'
	 * @param date Day to retrieve string date as index [{1: Lunedì, 2: Martedì, 3: Mercoledì, 4: Giovedì, ..}]
	 */
	const getDay = (date: Date) => days[date.getDay()]

	return (
		<div>
			<h3>Spazzatura</h3>
			<p>{getDate()}</p>

			<Accordion defaultActiveKey={getDay(new Date())}>
				{days.map((day) => {
					if (day === 'Domenica' || day === 'Sabato') {
						return null
					}

					const garbageData = props.data?.filter(checkDay => checkDay.day === day)
						.map(garbageList => garbageList.garbage.map(
							garbage => <p key={garbage}>{garbage}</p>
						))

					return (
						<Card key={day}>
							<Accordion.Toggle key={day + '-toggle'} as={Card.Header} eventKey={day}>{day}</Accordion.Toggle>
							<Accordion.Collapse key={day + '-collapse'} eventKey={day}>
								{garbageData && <Card.Body key={day + '-body'}>{(garbageData.length > 0 ? garbageData : 'Non c\'è spazzatura da buttare!')}</Card.Body>}
							</Accordion.Collapse>
						</Card>
					)
				})}
			</Accordion>

		</div >
	)
}

export default Garbage