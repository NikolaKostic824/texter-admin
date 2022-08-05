import React, { useState, useLayoutEffect } from "react";
import axios from "axios";

import WriterCardAdmin from "../reusable/WriterCardAdmin";
import CreateWriter from "./CreateWriter";

export default function UsersList() {
  //State for rendering user list
  const [writers, setWriters] = useState(null);
  //State to get individual user id for edit user
  const [writerId, setWriterId] = useState(null);
  //Setter for writer ID
  const setterForWriterId = (e) => {
    setWriterId(e);
  };
  const URL = "https://texter-test.herokuapp.com/user/admin";
  //Function after delete and update user to get updated writer list
  const reloadUserList = () => {
    axios.get(URL).then((response) => {
      setWriters(response.data);
    });
  };
  //Initial get all writes for list render
  useLayoutEffect(() => {
    let mounted = true;
    axios.get(URL).then((response) => {
      setWriters(response.data);
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      {writerId ? (
        <CreateWriter
          writerId={writerId}
          reloadUserList={reloadUserList}
          setterForWriterId={setterForWriterId}
        />
      ) : (
        <div className="writer-list">
          {writers &&
            writers.map((writer) => (
              <WriterCardAdmin
                writer={writer}
                key={writer._id}
                reloadUserList={reloadUserList}
                setterForWriterId={setterForWriterId}
              />
            ))}
        </div>
      )}
    </>
  );
}