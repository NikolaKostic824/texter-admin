import React, { useLayoutEffect, useState, useRef } from "react";
import axios from "axios";
import napred from "../../images/napred.png";
import nazad from "../../images/nazad.png";
export default function CreateWriter({
  writerId,
  reloadUserList,
  setterForWriterId,
}) {
  //Use ref for file input
  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
  };
  //Data for creation writer
  const [writer, setWriter] = useState({
    nameUser: "",
    about: "",
    signature: "",
    username: "",
    password: "",
    image: "",
  });
  const URL = "https://texter-test.herokuapp.com/user";
  //Create writer
  const createWriter = () => {
    axios.post(URL, writer).then((response) => {
      if (response.status === 201) {
        alert("Pisac Kreiran");
        reset();
        setWriter({
          nameUser: "",
          about: "",
          signature: "",
          username: "",
          password: "",
          image: "",
        });
      }
      if (response.status === 409) {
        alert("Greška!");
        setWriter({
          nameUser: "",
          about: "",
          signature: "",
          username: "",
          password: "",
          image: "",
        });
      }
    });
  };
  //Update writer
  const updateUser = () => {
    axios.patch(URL + "/" + writer._id, writer).then((response) => {
      if (response.status === 200) {
        reloadUserList();
        setterForWriterId(null);
      }
    });
  };
  // Initial occurrence if the writer's id exists
  useLayoutEffect(() => {
    let mounted = true;
    if (writerId) {
      axios.get(URL + "/" + writerId).then((response) => {
        setWriter(response.data);
      });
    }
    return () => (mounted = false);
  }, []);

  return (
    <div className="inputs">
      <input
        className="editor_input"
        type="text"
        placeholder="Username"
        value={writer.username}
        onChange={(e) => {
          setWriter({ ...writer, username: e.target.value });
        }}
      />
      <input
        className="editor_input"
        type="text"
        placeholder="Password"
        value={writer.password}
        onChange={(e) => {
          setWriter({ ...writer, password: e.target.value });
        }}
      />
      <input
        className="editor_input"
        type="text"
        placeholder="Ime"
        value={writer.nameUser}
        onChange={(e) => {
          setWriter({ ...writer, nameUser: e.target.value });
        }}
      />
      <input
        className="editor_input"
        type="text"
        placeholder="O piscu"
        value={writer.about}
        onChange={(e) => {
          setWriter({ ...writer, about: e.target.value });
        }}
      />
      <input
        className="editor_input"
        type="text"
        placeholder="Potpis"
        value={writer.signature}
        onChange={(e) => {
          setWriter({ ...writer, signature: e.target.value });
        }}
      />
      <img src={writer.image} alt="writer" className="create-writer_img" />
      <input
        className="editor_input"
        ref={ref}
        type="text"
        onChange={(e) => {
          setWriter({ ...writer, image: e.target.value });
        }}
      />
      {writerId ? (
        <>
          <button className="button-form-submit" onClick={() => updateUser()}>
            <span>Potvrdi</span> <img src={napred} alt="Arrow Right" />
          </button>
          <button
            className="button-form-submit"
            onClick={() => setterForWriterId(null)}
          >
            <span>Nazad</span> <img src={nazad} alt="Arrow Right" />
          </button>
        </>
      ) : (
        <button className="button-form-submit" onClick={() => createWriter()}>
          <span>Potvrdi</span> <img src={napred} alt="Arrow Right" />
        </button>
      )}
    </div>
  );
}