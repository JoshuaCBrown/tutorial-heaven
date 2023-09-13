import React, { useState, useEffect } from "react";
// import { resources } from "../datafolder/resourcedata";
import "./styles/TutorialDisplay.css";
import axios from "axios";
import TutContainer from "./TutContainer"

// const [currentSelection, setCurrentSelection] = useState("all");

export default function TutorialDisplay({ divId, idArrays, userId }) {
  const selected = divId;
  const parentIds = idArrays.parent;
  const childIds = idArrays.child;
  const gcIds = idArrays.grandchild;
  const ggcIds = idArrays.greatgrandchild;

  //state to store response from db, an array of post objects
  const [posts, setPosts] = useState(
    [
      {
        title: "",
        link: "",
        description: "",
        textInfo: "",
        tags: "",
        cat1: "",
        cat2: "",
        cat3: "",
        cat4: "",
        typeOfPost: "",
        postScore: "",
        vidThumbnail: {},
        videoId: "",
      },
    ]
  );

  //determines key value pair for db query based on selected category and depth
  const myQuery = () => {
    if (selected !== null && selected !== 'all') {
      if (parentIds.includes(selected)) {
        return {
          key: "cat1",
          value: selected,
        };
      } else if (childIds.includes(selected)) {
        return {
          key: "cat2",
          value: selected,
        };
      } else if (gcIds.includes(selected)) {
        return {
          key: "cat3",
          value: selected,
        };
      } else if (ggcIds.includes(selected)) {
        return {
          key: "cat4",
          value: selected,
        };
      }
    } else {
      return null;
    }
  };

  const urlToUse = () => {
    if (selected && selected !== 'all') {
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
      <ul>
        {posts.map((post) => (
          <li>
            <TutContainer post={post} userId={userId} />
          </li>
        ))}
      </ul>
      
      {/* <Displayer x={divId} /> */}
    </div>
  );
}
