import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pageImage from "../../../images/download.jpg";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";


// /Users/taruneswar/Documents/Front-end Web Development/signInConsoleMAMS/src/components/Pages/Login/Login.js
// /Users/taruneswar/Documents/Front-end Web Development/signInConsoleMAMS/images/download.jpg

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <>
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", background: `url(${pageImage}) no-repeat scroll center center`, backgroundSize: 'cover', }}>
    <div className="login">
      <div className="login__container">
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
      </div>
    </div>
    </div>
    </>
  );
}
export default Login;