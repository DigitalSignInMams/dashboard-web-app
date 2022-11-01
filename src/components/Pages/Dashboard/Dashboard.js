
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
  import 'antd/dist/antd.css';
  
  import { Alert, Calendar } from 'antd';
import moment from 'moment';


  
  import Button from "react-bootstrap/Button";
  import Modal from "react-bootstrap/Modal";
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

    const [value, setValue] = useState(() => moment('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => moment('2017-01-25'));
    const onSelect = (newValue) => {
      setValue(newValue);
      setSelectedValue(newValue);
    };
    const onPanelChange = (newValue) => {
      setValue(newValue);
    };

  
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
      if (!user) navigate("/");
    }, [user, loading, navigate]);
  
    return (
      <>
       
        <section style={{ padding: "50px" }}>
        <div>
        <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </div>
  
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
  