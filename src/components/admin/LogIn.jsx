import React, { useState } from "react";
import axios from "axios";

import napred from "../../images/napred.png";

export default function LogIn({ userSetter }) {
  //State for setting spinner/loader while waiting response from server for login
  const [loading, setLoading] = useState(false);
  //Username from input to send to server on login check
  const [username, setUsername] = useState("");
  //Password from input to send to server on login check
  const [password, setPassword] = useState("");
  const URL = "https://texter-test.herokuapp.com/user/login";


  const [visible,setVisible] = useState('password');

  const changeView = () => {
    setVisible(visible === 'password' ? 'text' : 'password')
  }

  //Login
  const logIn = () => {
    setLoading(true);
    axios.post(URL, { username, password }).then((response) => {
      if (response.status === 200) {
        userSetter(response.data);
        console.log(response.data)
      } else {
        alert("Korisnik nije pronadjen");
        setLoading(false);
      }
    });
  };
  return (
    <>
        <div className="inputs log-in">
          <h1>Log In</h1>
          <input
            className="editor_input"
            type="text"
            placeholder="Korisničko ime"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyPress={(event) => {
              var key = event.keyCode || event.which;
              if (key === 13) {
                // perform your Logic on "enter" button
                logIn();
              }
            }}
          />
          <input
            className="editor_input"
            type={visible}
            placeholder="Šifra"
            onChange={(e) => {
              setPassword(e.target.value);
              
            }}
            onKeyPress={(event) => {
              var key = event.keyCode || event.which;
              if (key === 13) {
                // perform your Logic on "enter" button
                logIn();
              }
            }}
          />
          <br />
          <button onClick={()=>changeView()}>ksadlja</button>
          {loading === false ? (
            <button className="button-form-submit" onClick={() => logIn()}>
              <span>Potvrdi</span> <img src={napred} alt="Arrow Right" />
            </button>
          ) : (
            <h1 className="text-loader">X</h1>
          )}
        </div>
    </>
  );
}
