
// auth
import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
  } from "../../../Firebase";
  

  import React, { useEffect, useState } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useNavigate } from "react-router";

  import "react-datetime/css/react-datetime.css";

  

  
  import Button from "react-bootstrap/Button";
  import Modal from "react-bootstrap/Modal";
  import moment from "moment";
  import Form from "react-bootstrap/Form";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import Datetime from "react-datetime";
  import MomentUtils from "../../../utils/MomentUtils";
  
  function DashboardPage() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
  
 
  
  
    let [currentEventName, setCurrentEventName] = useState("");
  
    let [currentFileName, setCurrentFileName] = useState("");
  
    let [currentLocationName, setCurrentLocationName] = useState("");
  
    let [currentKeepEvent, setCurrentKeepEvent] = useState(false);
  
    let [currentStartDateTime, setCurrentStartDateTime] = useState(
      MomentUtils.roundUp(moment(new Date()), "hour")
    );
  
    let [currentEndDateTime, setCurrentEndDateTime] = useState(
      MomentUtils.roundUp(moment(new Date()), "hour").add(1, "hour")
    );
  
    // let _contentState = ContentState.createFromText('Sample content state');
    // const raw = convertToRaw(_contentState)
    // const [contentState, setContentState] = useState(raw)
  
  

 
  
    // content to html
    // input html
  
    // useEffect(() => {
    //   listAll(imagesListRef).then((response) => {
    //     response.items.forEach((item) => {
    //       getDownloadURL(item).then((url) => {
    //         setImageUrls((prev) => [...prev, url]);
    //       });
    //     });
    //   });
    // }, []);
  
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen

        return;
      }
      if (!user) navigate("/login");
    }, [user, loading, navigate]);
  
    return (
      <>
       
        <section style={{ padding: "50px" }}>
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Group className="mb-3 w-25">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={currentEventName}
                onChange={(e) => {
                  setCurrentEventName(e.target.value);
                }}
              />
            </Form.Group>
  
            <Form.Group className="mb-3 w-25">
              <Form.Label>Location (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={currentEventName}
                onChange={(e) => {
                  setCurrentEventName(e.target.value);
                }}
              />
            </Form.Group>
  
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Post Time</Form.Label>
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
              <Form.Label>Blog File Storage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter file location"
                value={currentFileName}
                onChange={(e) => {
                  setCurrentFileName(e.target.value);
                }}
              />
            </Form.Group>
  
 
  
            <Form.Group className="mb-3">
              {/* implement this and submit to server*/}
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={currentLocationName}
                onChange={(e) => {
                  setCurrentLocationName(e.target.value);
                }}
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              {/* implement this and submit to server*/}
  
             
              
  
  
              <Form.Label>HTML insert</Form.Label>
  

    

  
            {/* <pre>
              {JSON.stringify(
                convertToRaw(this.state.contentState.getCurrentContent()),
                null,
                "  "
              )}
            </pre>
   */}
  
  
  
  
  
        
            
            </Form.Group>
  
            <Button onClick={e => alert(this.state.contentState.getCurrentContent)
              } variant="primary" type="submit">
              Post
            </Button>
          </Form>
  
          <br />
  
          <button
            className="btn pr-3 btn-outline-danger"
            onClick={() => {
              navigate("/logout");
            }}
          >
            Logout
          </button>
        </section>
      </>
    );
  }
  
  export default DashboardPage;
  