import React from "react";
import { Link } from "react-router-dom";

import nazad from "../../images/nazad.png";

export default function BackToLogin({ logOut }) {
  return (
    <div className="backToLogin">
      <Link to="/">
        <button className="button-form-submit" onClick={() => logOut()}>
          <span>Vrati se na login</span> <img src={nazad} alt="Arrow Right" />
        </button>
      </Link>
    </div>
  );
}
