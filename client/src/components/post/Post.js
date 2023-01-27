import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import backgroundImg from "../../assets/bg.jpg";

import { BsHeartFill } from "react-icons/bs";

function Post({ post }) {
  return (
    <div className="Post">
      <div className="heading">
        <Avatar />
        <h4>Ashish Goyal</h4>
      </div>
      <div className="content">
        <img src={backgroundImg} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <BsHeartFill className="icon" />
          <h4>4 likes</h4>
        </div>
        <p className="caption">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut,
          nesciunt laboriosam assumenda corrupti porro similique repellendus
          maxime nemo quis.
        </p>
        <h6 className="time-ago">4 hrs ago</h6>
      </div>
    </div>
  );
}

export default Post;
