import React, { useState, useEffect } from "react";
// import { resources } from "../datafolder/resourcedata";
import "./TutorialDisplay.css";

// const [currentSelection, setCurrentSelection] = useState("all");

export default function TutorialDisplay({ divId }) {
  const [posts, setPosts] = useState([
    {
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:3001/show")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setPosts(jsonRes));
  });

  //   console.log(divId);
  //   function Displayer(x) {
  //     if (divId === 2) {
  //       return resources.map((item) => (
  //         <div className="linkDiv" key={item.id}>
  //           <h4>{item.title}</h4>
  //           <a href={item.link}>Watch</a>
  //         </div>
  //       ));
  // return lame;
  //     } else {
  //       return (
  //         <div>
  //           <h1>{divId}</h1>
  //         </div>
  //       );
  //     }
  //   }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.title}>
          <h3>{post.title}</h3>
          <h4>{post.description}</h4>
        </div>
      ))}
      {/* <Displayer x={divId} /> */}
    </div>
  );
}
