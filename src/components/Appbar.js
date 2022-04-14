import React from "react";
import dashboard from "./icon-img/dashboard.png";

const Appbar = () => {
  return (
    <div className="appBar">
      <div className="appbar-logo">CryptoApp</div>
      <div className="buttons">
        <div className="appbar-div appbar-selected">
          <img className="appbar-p-img" src={dashboard} />
          <p className="appbar-p">Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
