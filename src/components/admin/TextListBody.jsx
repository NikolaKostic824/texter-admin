import React from "react";
import axios from "axios";

export default function TextListBody({
  article,
  reloadTextList,
  setterForTextId,
}) {
  const URL = "https://texter-test.herokuapp.com/text";
  //Update text/article by Id
  const approveText = (id) => {
    axios.patch(URL + "/approve/" + id).then((response) => {
      alert("Tekst odobren");
      //Send request to get updated text list on parent component
      reloadTextList();
    });
  };
  //Delete text/article by Id
  const deleteText = (id) => {
    axios.delete(URL + "/" + id).then((response) => {
      if (response.data.message === "Text was deleted") {
        alert("Tekst Obrisan");
        //Send request to get updated text list on parent component
        reloadTextList();
      }
    });
  };
  //Approve Text Dialog
  const approveTextConfirm = () => {
    if (window.confirm("Da li ste sigurni da zelite da odobrite text?")) {
      approveText(article._id);
    }
  };
  //Delete Text Dialog
  const deleteTextConfirm = () => {
    if (window.confirm("Da li ste sigurni da zelite da obrisete text?")) {
      deleteText(article._id);
    }
  };
  return (
    <tr>
      <td>{article.title}</td>
      <td>{article.author}</td>
      <td>{article.theme}</td>
      <td>
        {article.approved === 0 ? (
          <button onClick={() => approveTextConfirm()}>✔️</button>
        ) : (
          <></>
        )}
      </td>
      <td>
        <button onClick={() => deleteTextConfirm()}>❌</button>
      </td>
      <td>
        <button onClick={() => setterForTextId(article._id)}>⚙️</button>
      </td>
    </tr>
  );
}
