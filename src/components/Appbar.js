import React from "react";
import dashboard from "./icon-img/dashboard.png";
import profile from "./icon-img/profile.png";

const Appbar = () => {
  return (
    <div className="appBar">
      <div className="appbar-logo">CryptoApp</div>
      <div className="buttons">
        <div className="appbar-div">
          <img className="appbar-p-img appbar-p-img-2" src={profile} />
          <p className="appbar-p appbar-p-2">Home</p>
        </div>
        <div className="appbar-div appbar-selected">
          <img className="appbar-p-img" src={dashboard} />
          <p className="appbar-p">Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
