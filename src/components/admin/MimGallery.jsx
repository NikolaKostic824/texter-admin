import React, { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
// Components
import MimModal from "./MimModal";

export default function MimGallery() {
  //State for loader
  const [loading, setLoading] = useState(true);
  //List of all mims
  const [mims, setMims] = useState([]);
  //One mim selected
  const [selectedImage, setSelectedImage] = useState(null);
  //Remove one mim selected and back to the gallery of mims
  const setBack = () => {
    setSelectedImage(null);
  };
  // Locations
  const location = useLocation();
  const URL = "https://texter-test.herokuapp.com/mim";
  //Get all mim's
  useLayoutEffect(() => {
    let mounted = true;
    axios.get(URL).then((response) => {
      setMims(response.data);
      setLoading(false);
    });
    return () => (mounted = false);
  }, []);
  const reloadMimGallery = () => {
    setLoading(true);
    axios.get(URL).then((response) => {
      setMims(response.data);
      setLoading(false);
    });
  };
  //Delete text/article by Id
  const deleteMim = (id) => {
    axios.delete(URL + "/" + id).then((response) => {
      if (response.data.message === "Mim was deleted") {
        alert("Mim Obrisan");
        //Send request to get updated text list on parent component
        reloadMimGallery();
      }
    });
  };
  const deleteMimConfirm = (id) => {
    if (window.confirm("Da li ste sigurni da zelite da odobrite mim?")) {
      deleteMim(id);
    }
  };

  return (
    <div>
      {loading === true ? (
        <h1 className="text-loader">X</h1>
      ) : (
        <div>
          <h1 className="user-page_header">Mimovi</h1>
          <div className="img-grid">
            {mims &&
              mims
              .reverse()
              .map((mim) => (
                <div className="img-wrap" key={mim._id}>
                  <img
                    src={mim.image}
                    alt="Mim"
                    onClick={() => setSelectedImage(mim.image)}
                  />
                    <button
                      className="deleteMimBtn"
                      onClick={() => deleteMimConfirm(mim._id)}
                    >
                      ❌
                    </button>
                </div>
              ))}
          </div>
          {selectedImage && (
            <MimModal selectedImage={selectedImage} setBack={setBack} />
          )}
        </div>
      )}
    </div>
  );
}
