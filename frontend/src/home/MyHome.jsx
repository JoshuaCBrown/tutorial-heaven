import React, { useState, useEffect } from "react";
import { catStructure } from "./Categories";
import RecursiveDivRenderer from "./RecursiveDivRenderer";
import TutorialDisplay from "./TutorialDisplay";
import "./styles/MyHome.css";
import ControlPanel from "./ControlPanel";
import { categoryArrayizer } from "./categoryArrayizer";

function MyHome({ userId }) {
  const [divId, setDivId] = useState(null);

  const [idArrays, setIdArrays] = useState({
    parent: null,
    child: null,
    grandchild: null,
    greatgrandchild: null,
  });

  const startingExpansion = {
    0: null,
  };

  const [expandedDivs, setExpandedDivs] = useState(startingExpansion);

  const onItemClick = (itemId) => {
    setDivId(itemId);
  };

  useEffect(() => {
    const categoryIdArrays = categoryArrayizer();
    setIdArrays(categoryIdArrays);
  }, []);

  return (
    <div>
      <div className="navbar">
        <ControlPanel />
      </div>
      <div className="page-container">
        <div className="sidebar">
          <RecursiveDivRenderer data={catStructure} onItemClick={onItemClick} depth={0} expandedDivs={expandedDivs} setExpandedDivs={setExpandedDivs} divId={divId} />
        </div>
        <div className="tutorial-display">
          <TutorialDisplay divId={divId} idArrays={idArrays} userId={userId} />
        </div>
        {/* <DivCreator catStructure={catStructure} /> */}
      </div>
    </div>
  );
}

export default MyHome;
