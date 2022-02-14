import React from "react";
import dashboard from "./icon-img/dashboard.png";
import accounting from "./icon-img/accounting.png";
import analysis from "./icon-img/analysis.png";
import messages from "./icon-img/messages.png";
import profile from "./icon-img/profile.png";
import projects from "./icon-img/projects.png";

const Appbar = () => {
  return (
    <div className="appBar">
      <div className="appbar-logo">CryptoApp</div>
      <div className="buttons">
        <div className="appbar-div appbar-selected">
          <img className="appbar-p-img" src={dashboard} />
          <p className="appbar-p">Dashboard</p>
        </div>
        <div className="appbar-div">
          <img className="appbar-p-img appbar-p-img-2" src={profile} />
          <p className="appbar-p appbar-p-2">Profile</p>
        </div>
        <div className="appbar-div">
          <img className="appbar-p-img" src={analysis} />
          <p className="appbar-p">Analysis</p>
        </div>
        <div className="appbar-div">
          <img className="appbar-p-img" src={accounting} />
          <p className="appbar-p">Accounting</p>
        </div>
        <div className="appbar-div">
          <img className="appbar-p-img" src={messages} />
          <p className="appbar-p">Messages</p>
        </div>
        <div className="appbar-div">
          <img className="appbar-p-img" src={projects} />
          <p className="appbar-p">Projects</p>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
