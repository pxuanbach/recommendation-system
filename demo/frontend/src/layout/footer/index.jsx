import React from "react";
import "./index.css"
const Footer = () => {
  return (
    <div className="container-footer">
      <div className="name-web">Recomender Film</div>
      <div className="infor">
        <h1 className="title-collumn">THE BASICS</h1>
        <div className="list-select">
          <a> About Recomender Film</a>
          <a> Contact us</a>
          <a> Support Forums</a>
          <a> System Status</a>
        </div>
      </div>
      <div className="infor">
        <h1 className="title-collumn">GET INVOLVED</h1>
        <div className="list-select">
          <a> Contribution Bible</a>
          <a> Add New Movie</a>
          <a> Add New TV Show</a>
        </div>
      </div>
      <div className="infor">
        <h1 className="title-collumn">COMMUNITY</h1>
        <div className="list-select">
          <a> Guidelines</a>
          <a> Discussions</a>
          <a> Leaderboard</a>
          <a> Facebook</a>
        </div>
      </div>
      <div className="infor">
        <h1 className="title-collumn">LEGAL</h1>
        <div className="list-select">
          <a> Term of Use</a>
          <a> API Terms of Use</a>
          <a> Privacy Policy</a>
        </div>
      </div>
    </div>
)};

export default Footer;
