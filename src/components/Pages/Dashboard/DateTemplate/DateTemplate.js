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
import RequestUtils from "../../../../utils/RequestUtils";


  function DateTemplate() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const params = useParams();

    const { Column, ColumnGroup } = Table;


    let [morningRecords, setMorningRecords] = useState([]);

    let [studentVals, setStudentVals] = useState([]);

    let [studentSignIns, setStudentSignIns] = useState([]);


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

    useEffect(() => {populateEvents()}, []);
    useEffect(() => {signInMap()}, [studentSignIns]);
    let object = {}

    function populateEvents() {
      // getting the events from the database
      let selected = moment.unix(params.date).format("YYYY-MM-DD");

      RequestUtils.get("/test") // send out post req and get the response from server
          .then(response => response.json()) // take response and turn it into JSON object
          .then(data => { // data = JSON object created ^^
              if (!data.ok) {
                  alert("Events could not be populated!");
                  return;
              }
              console.log(data.arr)
              let object = {}

              for(let i = 0; i < data.arr.length; i++){
                object[data.arr[i]["student_id"]] = data.arr[i]["first_name"][0].toUpperCase() + data.arr[i]["first_name"].substring(1) + " " + data.arr[i]["last_name"][0].toUpperCase() + data.arr[i]["last_name"].substring(1)
              }


              console.log(object);
              setStudentVals(object);
          
              

          })
          .catch(error => {
              // alert("Something went wrong! 176");
          });

      RequestUtils.get("/test1?date=" + selected) // send out post req and get the response from server
          .then(response => response.json()) // take response and turn it into JSON object
          .then(data => { // data = JSON object created ^^
              if (!data.ok) {
                  alert("Events could not be populated!");
                  return;
              }

      



              setStudentSignIns(data.arr)
                              
              })
              
          .catch(error => {
            console.log(error);
              
          });

          

  }

function status (a, b) {
  if(moment(a, "HH:mm:ss").isAfter(moment("07:45:00"))){
    return "Late!"
  }
  if(moment(b, "HH:mm:ss").isBefore(moment("02:45:00"))){
    return "Left Early!"
  }
  else {
    return "Present"
  }

}

function signInMap() {
  let obj = {}

  for(let i = 0; i < Object.keys(studentSignIns).length; i++) {
    if((Object.keys(obj).some(key => key == studentSignIns[i]["student_id"])) == false){
      obj[studentSignIns[i]["student_id"]] = {"date_recorded": studentSignIns[i]["date_recorded"], "time_records": [studentSignIns[i]["time_recorded"]]};
    }
  
    else if(Object.keys(obj).some(key => key == studentSignIns[i]["student_id"])){
      
      console.log(studentSignIns[i]["student_id"].toString())
      let list = Array.from(obj[studentSignIns[i]["student_id"]]["time_records"]);

      list.push(studentSignIns[i]["time_recorded"]);
      obj[studentSignIns[i]["student_id"]]["time_records"] = list;
    }

   
  }
  console.log(obj);
  fill(obj);

}

function fill(obj) {
  let studentLogs = []
  let onTime = "Present";
  let signInIDS = []


  console.log(Object.keys(studentVals).length)

  let data = [{}]

  for(let i = 0; i < Object.keys(studentVals).length; i++){
    console.log(Object.keys(obj))
    if(Object.keys(obj).some(key => key == (i+1))) {
      let end = "N/A"
      if(obj[i+1]["time_records"][obj[i+1]["time_records"].length-1] != obj[i+1]["time_records"][0]) {
        end = obj[i+1]["time_records"][obj[i+1]["time_records"].length-1]
      }
      data.push({
            key: (i+1).toString(),
            name: studentVals[i+1],
            studentId: i+1,
            enterTime: obj[i+1]["time_records"][0],
            exitTime: end,
            status: [onTime] 
          })
    }
    else {
      data.push({
        key: (i+1).toString(),
        name: studentVals[i+1],
        studentId: i+1,
        enterTime: "N/A",
        exitTime: "N/A",
        status: ["N/A"]
      })
    }

  }
  console.log(data);
  setMorningRecords(data);

 

  // goal: list students with sign in and sign out times and status
  // list over sign-ins
  // create new sign-ins type list with each individual student with enter and exit based on the studentVals and student signins

 

  // console.log(obj)
  //   setMorningRecords(obj)
}



  
  // for(var i = 0; i < studentSignIns.length; i++){
  //   if(studentSignIns[i]["student_id"] in Object.keys(studentVals)){
  //     if(morningRecords.length < studentSignIns.length){
        
  //       if(moment(studentSignIns[i]["time_recorded"], "HH:mm:ss").isAfter(moment("07:44:59", "HH:mm:ss"))){
  //         onTime = "Late";
  //       }

        
  //       obj.push({
  //         key: (i+1).toString(),
  //         name: studentVals[studentSignIns[i]["student_id"]],
  //         studentId: studentSignIns[i]["student_id"],
  //         enterTime: studentSignIns[i]["time_recorded"],
  //         status: [onTime] 
  //       })
  //       setMorningRecords(obj)
  //     }

  //   }
    
  // }
  
  

 
  
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

        <Card.Title className="pt-3 pb-3">Attendance List</Card.Title>
        <Card.Subtitle>{moment.unix(params.date).format("MM/DD/YYYY")}</Card.Subtitle>
        <br></br>

        <Table dataSource={morningRecords}>
          
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Student ID" dataIndex="studentId" key="studentId" />
          <Column title="Sign-in Time" dataIndex="enterTime" key="enterTime" />
          <Column title="Sign-out Time" dataIndex="exitTime" key="exitTime" />
          <Column
          title="Status"
          dataIndex="status"
          key="status"
          // render={(tags) => (
          //   <>
          //     {tags.map((tag) => (
          //       <Tag color="blue" key={tag}>
          //         {tag}
          //       </Tag>
          //     ))}
          //   </>
          // )}
        />
          {/* <Column title="Last Name" dataIndex="lastName" key="lastName" />

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
        /> */}
    
      
      </Table>
      </div></>
    );
  }
  
  export default DateTemplate;
  