import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <GoogleOAuthProvider clientId="22977246976-humo9h8qp7hfkgm9dea6v3im771opr07.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
