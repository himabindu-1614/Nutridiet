import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import UserForm from "./components/UserForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = () => setLoggedIn(true);

  const handleUserSubmit = (data) => setUserData(data);

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : !userData ? (
        <UserForm onSubmit={handleUserSubmit} />
      ) : (
        <Dashboard user={userData} />
      )}
    </div>
  );
}

export default App;
