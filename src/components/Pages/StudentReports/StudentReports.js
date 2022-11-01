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
import { Space, Table, Tag } from 'antd';
  
  import Button from "react-bootstrap/Button";
  import Modal from "react-bootstrap/Modal";
  import Form from "react-bootstrap/Form";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import Datetime from "react-datetime";
  import MomentUtils from "../../../utils/MomentUtils";
  
  function StudentReport() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
  

    const { Column, ColumnGroup } = Table;
    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
  
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
        <section style={{ padding: "50px" }}>
        <div>
        <h2>Student Reports</h2>
        <br></br>
       
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
    );
  }
  
  export default StudentReport;
  