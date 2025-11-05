import React from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-box">
        <h1>NutriBalance</h1>
        <p>Your Personal Diet & Nutrition Tracker</p>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
