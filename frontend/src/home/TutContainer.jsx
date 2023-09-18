import React, { useState, useEffect } from "react";
// import { resources } from "../datafolder/resourcedata";
import "./styles/TutorialDisplay.css";
import video2 from "../assets/icons/video2.png";
import article4 from "../assets/icons/article4.png";
import self1 from "../assets/icons/self1.png";
import arrow3 from "../assets/arrow3.png";
import axios from "axios";

export default function TutContainer({ post, userId }) {
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

  const onVote = (vote, postId) => {
    const voteInfo = {
      vote: vote,
      tutId: postId,
    };
    console.log(voteInfo);
    axios.patch(`http://localhost:3001/postVote/${postId}/${userId}/${vote}`, voteInfo, { withCredentials: true })
      .then(res => {
        console.log('you\'ve successfully voted', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="tutdiv" key={post._id} id={post._id}>
        <div className="icondiv" key="icon">
          <img src={getIcon(post.typeOfPost)} alt={post.typeOfPost} />
        </div>
        <div className="tuttitle" key="title">
          <h1>{post.title}</h1>
        </div>
        <div className="scorediv" key="score">
          <img src={arrow3} key="uparrow" className="uparrow" onClick={() => onVote(1, post._id)} />
          <h2>{post.postScore}</h2>
          <img src={arrow3} key="downarrow" className="downarrow" onClick={() => onVote(-1, post._id)} />
        </div>
      </div>
    </>
  );
}
