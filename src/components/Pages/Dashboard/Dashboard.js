
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
import Card from 'react-bootstrap/Card';

  
  import Header from "../../header/Header";
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

    const [value, setValue] = useState(() => moment());
    const [selectedValue, setSelectedValue] = useState(() => moment());
    const onSelect = () => {
    
    
  
      navigate("/calendar/" + value.unix())
     
      
    };
    const onPanelChange = (newValue) => {
      setValue(newValue);
      setSelectedValue(newValue);
      
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
       <Header/>
        <section style={{ padding: "50px" }}>
        <div>
        <h2>Calendar View</h2>
        <br></br>
       
      <Calendar value={value} onPanelChange={onPanelChange} onSelect={onPanelChange}/>
      <button className="btn pr-3 btn-outline-info" onClick={() => {
            
            onSelect();
          }}>Go to date</button>
    </div>
  
          <button
            className="btn pr-3 btn-outline-danger"
            onClick={() => {
            
              navigate("/logout");
            }}
          >
            Logout from portal
          </button>
        </section>
      </>
    );
  }
  
  export default DashboardPage;
  