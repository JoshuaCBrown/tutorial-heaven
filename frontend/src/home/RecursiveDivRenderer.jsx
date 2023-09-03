import React, { useEffect, useState } from "react";
import "./styles/RecursiveDivRenderer.css";

const RecursiveDivRenderer = ({ data, onItemClick, depth, expandedDivs, setExpandedDivs, divId }) => {

  const [isSelected, setIsSelected] = useState("");

  const newHandleItemClick = (itemId) => {
    console.log(itemId);
    console.log(expandedDivs);
    setExpandedDivs((prevState) => ({
      ...prevState,
      [depth]: itemId,
    }));
    onItemClick(itemId);
  };

  const handleItemClick = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId],
    }));

    onItemClick(itemId);
    setIsSelected(itemId);
  };

  return (
    <div className="home-sidebar">
      {data.map((item) => (
        <div key={item.id} className="category-container">
          <div
            className={divId === item.id ? "selected" : "category"}
            key={item.id}
            onClick={() => newHandleItemClick(item.id)}
          >
            {item.category}
          </div>
          <div key="wholechild" className="childdiv">
            {item.children && expandedDivs[depth] === item.id && (
              <RecursiveDivRenderer
                data={item.children}
                onItemClick={onItemClick}
                depth={depth+1}
                expandedDivs={expandedDivs}
                setExpandedDivs={setExpandedDivs}
                divId={divId}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecursiveDivRenderer;
