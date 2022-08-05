import React, { useState, useRef } from "react";
import axios from "axios";

import napred from "../../images/napred.png";
export default function CreateMim() {
  //Use ref for file input
  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
  };
  //Data form mim creation
  const [image, setImage] = useState("");
  const [updating, setUpdating] = useState(false);
  //URL for mim creation
  const URL = "https://texter-test.herokuapp.com/mim";
  //Mim Upload to Server
  const uploadMim = () => {
    setUpdating(true);
    axios.post(URL, { image }).then((response) => {
      if (response.status === 201) {
        alert("Mim Kreiran");
        setImage("");
        setUpdating(false);
        reset();
      }
      if (response.status === 409) {
        alert("Greška!");
        setImage("");
        setUpdating(false);
        reset();
      }
    });
  };
  return (
    <div className="inputs">
      <img src={image} alt="mim" />
      <input
        ref={ref}
        className="editor_input"
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      {image === "" ? (
        <></>
      ) : updating === true ? (
        <h1 className="text-loader">X</h1>
      ) : (
        <button className="button-form-submit" onClick={() => uploadMim()}>
          <span>Upload</span> <img src={napred} alt="Arrow Right" />
        </button>
      )}
    </div>
  );
}