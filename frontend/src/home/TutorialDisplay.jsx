import React, { useState, useEffect } from "react";
// import { resources } from "../datafolder/resourcedata";
import "./styles/TutorialDisplay.css";
import axios from "axios";

// const [currentSelection, setCurrentSelection] = useState("all");

export default function TutorialDisplay({ divId, idArrays }) {
  const selected = divId;
  const parentIds = idArrays.parent;
  const childIds = idArrays.child;
  const gcIds = idArrays.grandchild;
  const ggcIds = idArrays.greatgrandchild;

  const [posts, setPosts] = useState([
    {
      title: "",
      description: "",
      cat1: "",
      cat2: "",
      cat3: "",
      cat4: "",
    },
  ]);

  const myQuery = () => {
    if (selected !== null) {
      if (parentIds.includes(selected)) {
        return {
          key: "cat1",
          value: selected,
        };
      } else if (childIds.includes(selected)) {
        return {
          cat2: selected,
        };
      } else if (gcIds.includes(selected)) {
        return {
          cat3: selected,
        };
      } else if (ggcIds.includes(selected)) {
        return {
          cat4: selected,
        };
      }
    } else {
      return null;
    }
  };

  const urlToUse = () => {
    if (selected) {
      return (
        "http://localhost:3001/show/query?" + new URLSearchParams(myQuery())
      );
    } else {
      return "http://localhost:3001/show";
    }
  };

  const myUrl = urlToUse();

  useEffect(() => {
    console.log(myUrl);
    axios
      .get(myUrl)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, [divId]);

  // useEffect(() => {
  //   fetch(myUrl)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((jsonRes) => setPosts(jsonRes));
  // }, [divId]);

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
          <h5>
            {post.cat1} {post.cat2} {post.cat3} {post.cat4}
          </h5>
        </div>
      ))}
      {/* <Displayer x={divId} /> */}
    </div>
  );
}
