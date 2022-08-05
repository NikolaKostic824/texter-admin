import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminNav({ logOut, user }) {
  //URL path for conditional render for Clients and Admin
  const location = useLocation();
  //Data for burger display
  const [burger, setBurger] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  useEffect(() => {
    const body = document.querySelector("body");
    if (width <= "991") {
      body.style.overflowY = burger ? "auto" : "hidden";
    }
  }, [burger, width]);
  //Css for burger hover and active state
  const noMenu = {
    display: "none",
  };
  const menuActive = {
    display: "inline-block",
  };
  const menuActiveMobileWrapper = {
    display: "block",
  };
  const menuActiveMobile = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "95%",
  };
  const menuActiveBurger = {
    width: "20%",
    marginRight: "0",
  };
  const menuBurger = {
    backgroundColor: "#000",
  };
  return (
    <>
      <nav role="navigation" id="desktop" className="navigation admin-nav">
        <h1>
          {location.pathname === "/" ? (
            <Link to="/">Editor </Link>
          ) : location.pathname === "/kreiraj-mim" ? (
            <Link to="/">Keiraj Mim </Link>
          ) : location.pathname === "/kreiraj-pisca" ? (
            <Link to="/">Kreiraj Pisca</Link>
          ) : location.pathname === "/lista-pisaca" ? (
            <Link to="/">Lista Pisaca</Link>
          ) : location.pathname === "/lista-tekstova" ? (
            <Link to="/">Lista Tekstova</Link>
          ) : (
            <Link to="/">Texter</Link>
          )}
        </h1>
        <div className="menuToggle">
          {user.role === 1 ? (
            <div className="menu" style={burger ? noMenu : menuActive}>
              <Link to="/" onClick={() => setBurger(true)}>
                Kreiraj Tekst
              </Link>
              <Link to="/kreiraj-mim" onClick={() => setBurger(true)}>
                Kreiraj Mim
              </Link>
              <Link to="/kreiraj-pisca" onClick={() => setBurger(true)}>
                Kreiraj Pisca
              </Link>
              <Link to="/lista-pisaca" onClick={() => setBurger(true)}>
                Lista Pisaca
              </Link>
              <Link to="/lista-tekstova" onClick={() => setBurger(true)}>
                Lista Tekstova
              </Link>
              <Link to="/mimovi" onClick={() => setBurger(true)}>
                Mimovi
              </Link>
              <Link to="" onClick={() => logOut()}>
                LogOut
              </Link>
            </div>
          ) : (
            <div
              className="menu"
              style={burger ? noMenu : menuActive}
              onClick={() => setBurger(noMenu)}
            >
              <Link to="/" onClick={() => setBurger(noMenu)}>
                Kreiraj Tekst
              </Link>
              <Link to="/kreiraj-mim" onClick={() => setBurger(noMenu)}>
                Kreiraj Mim
              </Link>
              <Link to="" onClick={() => logOut()}>
                LogOut
              </Link>
            </div>
          )}
          <div
            className="burger"
            onClick={() => setBurger(burger === true ? false : true)}
          >
            <span
              className="bar"
              style={burger ? menuBurger : menuActiveBurger}
            ></span>
            <span></span>
            <span
              className="bar"
              style={burger ? menuBurger : menuActiveBurger}
            ></span>
          </div>
        </div>
      </nav>

      <nav role="navigation" id="mobile" className="navigation admin-nav">
        <div className="nav-mobile-wrapper">
          <h1>
            {location.pathname === "/" ? (
              <Link to="/">Editor </Link>
            ) : location.pathname === "/kreiraj-mim" ? (
              <Link to="/">Keiraj Mim </Link>
            ) : location.pathname === "/kreiraj-pisca" ? (
              <Link to="/">Kreiraj Pisca</Link>
            ) : location.pathname === "/lista-pisaca" ? (
              <Link to="/">Lista Pisaca</Link>
            ) : location.pathname === "/lista-tekstova" ? (
              <Link to="/">Lista Tekstova</Link>
            ) : (
              <Link to="/">Texter</Link>
            )}
          </h1>

          <div className="menuToggle">
            <div
              className="burger"
              onClick={() => setBurger(burger === true ? false : true)}
            >
              <span
                className="bar"
                style={burger ? menuBurger : menuActiveBurger}
              ></span>
              <span></span>
              <span
                className="bar"
                style={burger ? menuBurger : menuActiveBurger}
              ></span>
            </div>
          </div>
        </div>
        {user.role === 1 ? (
          <div
            className="menu"
            id="menuMobile"
            style={burger ? noMenu : menuActiveMobile}
          >
            <div style={menuActiveMobile}>
              <Link to="/" onClick={() => setBurger(true)}>
                Kreiraj Tekst
              </Link>
              <Link to="/kreiraj-mim" onClick={() => setBurger(true)}>
                Kreiraj Mim
              </Link>
              <Link to="/kreiraj-pisca" onClick={() => setBurger(true)}>
                Kreiraj Pisca
              </Link>
              <Link to="/lista-pisaca" onClick={() => setBurger(true)}>
                Lista Pisaca
              </Link>
              <Link to="/lista-tekstova" onClick={() => setBurger(true)}>
                Lista Tekstova
              </Link>
              <Link to="/mimovi" onClick={() => setBurger(true)}>
                Mimovi
              </Link>
              <Link to="" onClick={() => logOut()}>
                LogOut
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="menu"
            style={burger ? noMenu : menuActiveMobile}
            onClick={() => setBurger(noMenu)}
            id="menuMobile"
          >
            <div style={menuActiveMobile}>
              <Link to="/" onClick={() => setBurger(noMenu)}>
                Kreiraj Tekst
              </Link>
              <Link to="/kreiraj-mim" onClick={() => setBurger(noMenu)}>
                Kreiraj Mim
              </Link>
              <Link to="" onClick={() => logOut()}>
                LogOut
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
