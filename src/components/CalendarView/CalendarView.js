import React, { useEffect, useState } from "react";
import CalendarEvent from "./CalendarEvent/CalendarEvent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datetime from 'react-datetime';
import moment from "moment";
import MomentUtils from "../../utils/MomentUtils";
import RequestUtils from "../../utils/RequestUtils";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "./CalendarView.css";
import OldCalendarEvent from "./OldCalendarEvent/OldCalendarEvent";

function CalendarView() {

    /**  State Variables **/

    // State: hold a list of events
    let [listEvents, setListEvents] = useState([]);

    let [listOldEvents, setListOldEvents] = useState([]);

    let [showModal, setShowModal] = useState(false);

    let [showOldEvents, setShowOldEvents] = useState(false);

    let [editing, setEditing] = useState(false);

    let [currentEventId, setCurrentEventId] = useState("");

    let [currentEventName, setCurrentEventName] = useState("");

    let [currentLocationName, setCurrentLocationName] = useState("");

    let [currentKeepEvent, setCurrentKeepEvent] = useState(false);

    // Data type of startDateTime IN DB is String: MM/DD/YY hh:mm A
    // Data type of startDateTime IN APPLICATION is Moment object
    let [currentStartDateTime, setCurrentStartDateTime] = useState(MomentUtils.roundUp(
        moment(new Date()),
        "hour"
    ));

    let [currentEndDateTime, setCurrentEndDateTime] = useState(MomentUtils.roundUp(
        moment(new Date()),
        "hour"
    ).add(1, "hour"));

    /** Helper Functions **/

    useEffect(populateEvents, []);

    useEffect(deleteOldEvents, [listEvents]);

    function showOldEventsModal() {
        setShowOldEvents(true);
    }

    function hideOldEventsModal() {
        setShowOldEvents(false);
    }

    function showEventModal() {
        setShowModal(true);
    }

    function hideEventModal() {
        setShowModal(false);
    }

    function sortEvents(list) {
        return list.sort((event1, event2) => {
            let ev1ST = moment(event1.startTime);
            let ev2ST = moment(event2.startTime);
            return ev1ST.diff(ev2ST);
        });
    }

    function resetEventForm() {
        setCurrentEventName("");
        setCurrentStartDateTime(MomentUtils.roundUp(
            moment(new Date()),
            "hour"
        ));
        setCurrentEndDateTime(MomentUtils.roundUp(
            moment(new Date()),
            "hour"
        ).add(1, "hour"));
        setCurrentLocationName("");
        setCurrentEventId("");
    }


/** CRUD FUNCTIONS **/

    // CREATE

    // Function called when "Add Event" button is pressed
    function handleAdd() {
        // 1. Clear the form
        resetEventForm();

        // 2. Set editing to false
        setEditing(false);

        // 3. Show the modal
        showEventModal();
    }
    
    // Creation of event
    function createNewEvent(e) {
        // Prevents default action of form submission refreshing the page
        e.preventDefault();

        let startTime = currentStartDateTime.format("MM/DD/YY hh:mm A");
        let endTime = currentEndDateTime.format("MM/DD/YY hh:mm A");

        // Form validation: Required fields are eventName, startTime, endTime
        if (currentEventName == "" || startTime == "" || endTime == "") {
            return;
        }

        // Create the object to give to backend
        let reqObj = {
            eventName: currentEventName,
            startTime: startTime,
            endTime: endTime,
            location: currentLocationName,
            keepEvent: false
        }

        RequestUtils.post("http://localhost:8080/event/create", reqObj) // send out post req and get the response from server
        .then(response => response.json()) // take response and turn it into JSON object
        .then(data => { // data = JSON object created ^^
            if (!data.ok) {
                alert("Event could not be created!");
                return;
            }
            // 1. Clear the form and reset it
            resetEventForm();

            // 2. Close the modal
            hideEventModal();

            // 3. Add the _id to event object
            reqObj["_id"] = data._id

            // 4. Add this event to the list of events
            let existingLOEvents = [...listEvents];
            existingLOEvents.push(reqObj);

            let sortedLOEvents = sortEvents(existingLOEvents);
            setListEvents(sortedLOEvents);
        })
        .catch(error => {
            alert("Something went wrong!");
        });
        
    }

    // READ
    function populateEvents() {
        // getting the events from the database
        RequestUtils.get("http://localhost:8080/event/savedEvents") // send out post req and get the response from server
        .then(response => response.json()) // take response and turn it into JSON object
        .then(data => { // data = JSON object created ^^
            if (!data.ok) {
                alert("Events could not be populated!");
                return;
            }
            let sortedLOEvents = sortEvents(data.arr);
            setListEvents(sortedLOEvents);


        })
        .catch(error => { 
            alert("Something went wrong! 176");
        }); 
        
    }

    // EDIT

    // Function that's called when "edit" button is pressed
    function handleEdit(_id) {
        // 1. Set editing to true
        
        setEditing(true);

        // 2. Populate event fields
        populateEventFields(_id);

        // 3. Show the modal
        showEventModal();
    }

    // Function that fills in the fields of modal for editing
    // FIXME: Setters async. Change all fields to normal variables
    function populateEventFields(_id) {
        let listEventsCopy = listEvents.filter((event) => {
            return((event._id).localeCompare(_id) == 0);
        });

        let event = listEventsCopy[0]
        let eventName = event.eventName
        setCurrentEventName(eventName);
        let startTime = event.startTime
        setCurrentStartDateTime(moment(startTime));
        let endTime = event.endTime
        setCurrentEndDateTime(moment(endTime));
        let locationName = event.location
        setCurrentLocationName(locationName)
        setCurrentEventId(event._id);
        setCurrentKeepEvent(event.keepEvent);
    }

    // Function to submit the edits
    function editExistingEvent(e) {
        if (e != null){
            e.preventDefault();
        }
        
        let startTime = currentStartDateTime.format("MM/DD/YY hh:mm A");
        let endTime = currentEndDateTime.format("MM/DD/YY hh:mm A");
        
        let listEventsCopy = [...listEvents];

        
        listEventsCopy.forEach((element, index) => {
            if((listEventsCopy[index]._id).localeCompare(currentEventId) == 0){
                listEventsCopy[index].eventName = currentEventName;
                listEventsCopy[index].startTime = startTime;
                listEventsCopy[index].endTime = endTime;
                listEventsCopy[index].location = currentLocationName;
                listEventsCopy[index].keepEvent = currentKeepEvent;
            }
        });

   
        
        let reqObj = {
            _id: currentEventId,
            eventName: currentEventName,
            startTime: startTime,
            endTime: endTime,
            location: currentLocationName,
            keepEvent: currentKeepEvent
        }

        RequestUtils.post("http://localhost:8080/event/update", reqObj)
        .then(response => response.json())
        .then(data => { 
            if (!data.ok) {
                alert("Event could not be updated!");
                return;
            }

            // 1. Pushing edits to front end
            let sortedLOEvents = sortEvents(listEventsCopy);
            setListEvents(sortedLOEvents);
            
            // 2. Clear the form and reset it
            resetEventForm();

            // 3. Close the modal
            hideEventModal();
        })
        .catch(error => {
            alert("Something went wrong!");
        }); 
    }

    // DELETE
    function deleteOldEvents() {
        // 1. find today's date
        
        
        let today = moment();

        // 2. filter events where event date < today's date (all old events)
        let oldEvents = listEvents.filter((event) => {
                
                return ((moment(event.endTime)).isBefore(today) && event.keepEvent == false);

            });
        

        // 3. if listOldEvents length > 0,
            // setListOldEvents
            // open modal, show + hide modal
        if(oldEvents.length > 0) {
            setListOldEvents(oldEvents);
            showOldEventsModal();
        }

        // either keep or delete the past event
            // if delete event, use handleDelete
            // if keep, do nothing 
    }

    /**
     * "Keep" the event by deleting it from the "old calendar events" list
     * @param {string} _id 
     */
    function removeOldCalendarEvent(_id) {

    
        // get the event object with the id and then set all the stateful variables and then call edit
        setCurrentKeepEvent(true);
        setCurrentEventId(_id)

        if (currentEventId == "") {
            return;
        }

        let reqObj = {
            _id: currentEventId
        }

        // HACK: since useState is async, wait 1s before calling the update
        RequestUtils.post("http://localhost:8080/event/keep", reqObj)
        .then(response => response.json())
        .then(data => { 
            if (!data.ok) {
                alert("Event could not be updated!");
                return;
            }

            let listEventsCopy = listOldEvents.filter((event) => {
            
                return((event._id).localeCompare(_id) != 0);
            });
    
            
    
            setListOldEvents(listEventsCopy);  
            resetEventForm();
        })
        .catch(error => {
            alert("Something went wrong!");
        }); 

        
    }

    /**
     * Delete the calendar event with the given ID
     * @param {string} _id 
     */
    function handleDelete(_id) {
        // Take the _id of the calendar event
        // Remove the event from the list of calendar events
        let req = {
            _id: _id
        }

        RequestUtils.post("http://localhost:8080/event/delete", req)
        .then(response => response.json())
        .then(data => {
            if (!data.ok) {
                alert("Event could not be deleted!");
                return;
            }

            let listEventsCopy = listEvents.filter((event) => {
                return((event._id).localeCompare(_id) != 0);
            });

            setListEvents(listEventsCopy);
            
            // Also remove it from listOldEvents just in case handleDelete is being called from oldCalendarEvent
          //  removeOldCalendarEvent(_id);
        })
        .catch(error => {
            alert("Something went wrong!");
        });
    }

    return (
        <>
        <Navbar bg="info" expand="lg">
            <Container className="maxwidth-none">
            <Navbar.Brand href="#home" className="text-white">Calendar.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link onClick={handleAdd} className="text-secondary">Create New Event</Nav.Link>
                <Nav.Link href="#link" className="text-secondary">Link</Nav.Link>

            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

            <div>
            {
                listEvents.map((element) => {
                    // Code that runs for each element
                    // TODO: Create delete handler
                    return (
                        <CalendarEvent event={element} deleteHandler={handleDelete} editHandler={handleEdit}/>
                    );
                })
            }
            </div>

            <Modal show={showModal} onHide={hideEventModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? "Edit" : "New"} Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editing ? editExistingEvent : createNewEvent}>
                        <Form.Group className="mb-3">
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter event name" value={currentEventName} onChange={(e) => { setCurrentEventName(e.target.value) }} />
                        </Form.Group>

                        <Row>
                            <Col>
                                { /* TODO: Make datepicker default nearest hour, duration 30 minutes. */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Start Time</Form.Label>
                                    <Datetime
                                        value={currentStartDateTime}
                                        timeConstraints={{ minutes: { step: 5 } }}
                                        onChange={setCurrentStartDateTime}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>End Time</Form.Label>
                                    <Datetime
                                        value={currentEndDateTime}
                                        timeConstraints={{ minutes: { step: 5 } }}
                                        onChange={setCurrentEndDateTime}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            {/* implement this and submit to server*/}
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Enter location" value={currentLocationName} onChange={(e) => { setCurrentLocationName(e.target.value) }} />
                        </Form.Group>

                        <Button variant="primary" type="submit">{editing ? "Save" : "Create"} Event </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <Modal show={showOldEvents} onHide={hideOldEventsModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>These events have passed. Do you want to delete them?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        listOldEvents.map((element) => {
                            // Code that runs for each element
                            // TODO: Create delete handler
                            return (
                                <OldCalendarEvent event={element} deleteHandler={handleDelete} keepHandler={removeOldCalendarEvent}/>
                            );
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    );

}

export default CalendarView;
