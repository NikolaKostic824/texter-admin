import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

//Components
import LogIn from "./components/admin/LogIn";
import AdminLayout from "./components/admin/AdminLayout";

import BackToTheTop from "./components/reusable/BackToTheTop";

export default function App() {
  const scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    console.log("s")
  };

  //If user exist on login
  const [user, setUser] = useState(null);

  const userSetter = (e) => {
    setUser(e);
  };
  //Logout
  const logOut = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {user !== null ? (
        <Route path="/">
          <AdminLayout logOut={logOut} user={user} />
        </Route>
      ) : (
        <Route path="/">
          <LogIn userSetter={userSetter} />
        </Route>
      )}
      <BackToTheTop scrollTop={scrollTop} />
    </div>
  );
}
