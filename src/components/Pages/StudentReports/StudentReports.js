// auth
import {
    auth,
    logInWithEmailAndPassword,
    signInWithGoogle,
  } from "../../../Firebase";
  


  import { useAuthState } from "react-firebase-hooks/auth";
  import { useNavigate } from "react-router";
  import "react-datetime/css/react-datetime.css";
  import 'antd/dist/antd.css';
  import { Avatar, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

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
    const [initLoading, setInitLoading] = useState(true);
    const [loadingSet, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const count = 50;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    useEffect(() => {
      fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((res) => {
          setInitLoading(false);
          setData(res.results);
          setList(res.results);
        });
    }, []);
    const onLoadMore = () => {
      setLoading(true);
      setList(
        data.concat(
          [...new Array(count)].map(() => ({
            loadingSet: true,
            name: {},
            picture: {},
          })),
        ),
      );
      fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((res) => {
          const newData = data.concat(res.results);
          setData(newData);
          setList(newData);
          setLoading(false);
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        });
    };
    const loadMore =
      !initLoading && !loadingSet ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      ) : null;

  
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
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit">View Record</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description=""
            />
            <div>11th</div>
          </Skeleton>
        </List.Item>
      )}
    />
  
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
  