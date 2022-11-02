// auth
import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
  } from "../../../../Firebase";
  

  import { Button } from "react-bootstrap";
  import React, { useEffect, useState } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useNavigate } from "react-router";
  import "react-datetime/css/react-datetime.css";
  import 'antd/dist/antd.css';
  import { useLocation, useParams } from "react-router";
  import { Alert, Calendar } from 'antd';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { Space, Table, Tag } from 'antd';
import Header from "../../../header/Header";
  
  function DateTemplate() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const params = useParams();

    const { Column, ColumnGroup } = Table;

    // pull data from db later
    const data = [
      {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        locker: 32,
        report: 'New York No. 1 Lake Park',
        tags: ['Absent'],
      },
      {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        locker: 42,
        report: 'London No. 1 Lake Park',
        tags: ['present'],
      },
      {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        locker: 32,
        report: 'Sidney No. 1 Lake Park',
        tags: ['present'],
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
      <>
      <Header/>
        <div className="px-5 pt-2">

        <Card.Title className="pt-3 pb-3">{moment.unix(params.date).format("MM/DD/YYYY")}</Card.Title>

        {/* placeholder data, req db later */}
        <Table dataSource={data}>
 
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />

        <Column title="Locker Number" dataIndex="locker" key="locker" />
        
        <Column
          title="Status"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Status"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Button color="blue" key={tag}>
                  Adjust Record
                </Button>
              ))}
            </>
          )}
        />
    
      
      </Table>
      </div></>
    );
  }
  
  export default DateTemplate;
  