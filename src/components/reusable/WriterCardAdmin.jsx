import React from "react";
import axios from "axios";

export default function WriterCard({
  writer,
  reloadUserList,
  setterForWriterId,
}) {
  //URL to Work with writers
  const URL = "https://texter-test.herokuapp.com/user/";
  //Request to server to delete user
  const deleteUser = (id) => {
    axios.delete(URL + id).then((response) => {
      if (response.data.message === "User was deleted") {
        alert("Pisac Obrisan");
        //Send request to get updated users list on parent component
        reloadUserList();
      }
    });
  };
  // Confirm Dialog for Delete User
  const deleteUserConfirm = () => {
    if (window.confirm("Da li ste sigurni da zelite da obrisete usera?")) {
      deleteUser(writer._id);
    }
  };
  return (
    <div
      className="writer-card"
    >
      <img src={writer.image} alt={writer.nameUser + " avatar"} />
      <h2>{writer.nameUser}</h2>
      <div>
        <button onClick={() => deleteUserConfirm()}>Obrisi ❌</button>
        <button onClick={() => setterForWriterId(writer._id)}>
          Edit Pisca ⚙️
        </button>
      </div>
    </div>
  );
}
