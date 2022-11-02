import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pageImage from "../../../images/download.jpg";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Button, Checkbox, Form, Input } from 'antd';
import Header from "../../header/Header";

// /Users/taruneswar/Documents/Front-end Web Development/signInConsoleMAMS/src/components/Pages/Login/Login.js
// /Users/taruneswar/Documents/Front-end Web Development/signInConsoleMAMS/images/download.jpg

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
   // window.location.reload(true);
  }, []);
  useEffect(() => {

    if (loading) {
      // maybe trigger a loading screen
      
      return;
    }
    if (user) {
      navigate("/dashboard");
      window.location.reload(true);
    }
  }, [user, loading]);
  const onFinish = (values) => {

    
    logInWithEmailAndPassword(values['email'], values['password'])
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <>
    <Header/>
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", background: `url(${pageImage}) no-repeat scroll center center`, backgroundSize: 'cover', }}>
    <div className="login">
      <div className="login__container">
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your WPI email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form> 
    </div></div>
    </div>
    </>

/* <div className="login__container">
<input
  type="text"
  className="login__textBox"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="E-mail Address"
/>
<input
  type="password"
  className="login__textBox"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
/>
<button
  className="login__btn"
  onClick={() => logInWithEmailAndPassword(email, password)}
>
  Login
</button>
</div> */
  );
}
export default Login;