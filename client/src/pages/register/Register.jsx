import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleStart = async (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
  };
  console.log("pas", password);

  const handleFinish = async (e) => {
    e.preventDefault();
    console.log("email", email);
    // setPassword(passwordRef.current.value);
    // setUsername(usernameRef.current.value);
    console.log("pas2", password);
    console.log("pas2", username);
    try {
      const data = await axios.post("auth/register", {
        email,
        username,
        password,
      });
      console.log("data", data);
      history.push("/login");
    } catch (err) {}
  };
  const signin = (e) => {
    e.preventDefault();
    console.log("123");
    history.push("/login");
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button className="loginButton" onClick={signin}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            {/* <input type="username" placeholder="username" ref={usernameRef} /> */}
            <input
              type="username"
              placeholder="Email or phone number"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <input type="password" placeholder="password" ref={passwordRef} /> */}
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
