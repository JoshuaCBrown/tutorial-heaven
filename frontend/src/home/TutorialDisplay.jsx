import React, { useState } from "react";
// import { resources } from "../datafolder/resourcedata";
import './TutorialDisplay.css'
import axios from "axios";


export default function TutorialDisplay({ divId }) {
  console.log(divId);
    function Displayer(x) {
        if (divId === 2) {
            return resources.map((item) => (
                <div className="linkDiv" key={item.id}>
                    <h4>{item.title}</h4>
                    <a href={item.link}>Watch</a>
                </div>
            ));
            // return lame;
        } else {
            return (
                <div>
                    <h1>{divId}</h1>
                </div>
            )
        }
    }

  return (
    <>
        <Displayer x={divId}/>
    </>
  )
}
