import React, { useState, useEffect } from "react";
// import { resources } from "../datafolder/resourcedata";
import "./styles/TutorialDisplay.css";
import video2 from "../assets/icons/video2.png";
import article4 from "../assets/icons/article4.png";
import self1 from "../assets/icons/self1.png";
import arrow from "../assets/arrow.png";

export default function TutContainer({ post }) {
  function getIcon(postType) {
    if (postType === "video") {
      return video2;
    }
    if (postType === "article") {
      return article4;
    }
    if (postType === "text") {
      return self1;
    } else {
      return null;
    }
  }

  return (
    <>
      <div className="tutdiv" key={post._id} id={post._id}>
        <div className="icondiv">
          <img src={getIcon(post.typeOfPost)} alt={post.typeOfPost} />
        </div>
        <h1>{post.title}</h1>
        <div className="scorediv">
          <img src={arrow} key="uparrow" className="uparrow" />
          <h2>{post.postScore}</h2>
          <img src={arrow} key="downarrow" className="downarrow" />
        </div>
      </div>
    </>
  );
}
