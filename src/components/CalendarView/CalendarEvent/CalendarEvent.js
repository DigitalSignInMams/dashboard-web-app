import Card from "react-bootstrap/Card";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button'

function CalendarEvent(props) {
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.event.eventName}</Card.Title>
                <Card.Text>{props.event.startTime} - {props.event.endTime}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{props.event.location}</Card.Subtitle>


                <ButtonToolbar>
                    <ButtonGroup className="me-2" aria-label="First group">
                        <button className="btn pr-3 btn-outline-secondary" onClick={() => { props.editHandler(props.event._id) }}>edit</button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <button className="btn pr-3  btn-outline-danger" onClick={() => { props.deleteHandler(props.event._id) }}>delete</button>
                    </ButtonGroup>
                </ButtonToolbar>


            </Card.Body>
        </Card>
    );
}

export default CalendarEvent;