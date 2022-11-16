import { useContext, useState } from "react";
import { login, googleLogin } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import "./googleLogin.scss"
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    
  };
  const handleGoogleLogin = async (googleData) => {
    const dataParse = jwtDecode(googleData.credential);
    console.log(dataParse);
    // googleLogin({ email, password }, dispatch);
    googleLogin(dataParse, dispatch);
  };
   const handleGoogleFailure = () => {
    // console.log("Failure");
  };
  return (
    <div className="login">
      
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <div className="google-login">
          <GoogleLogin
            text="signin with Google"
            // size="medium"
            shape="rectangular"
            // locale="circle"
            ux_mode="popup"
            cancel_on_tap_outside
            context="signin"
            theme="outline"
            width="100"
             size="small"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
          </div>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
