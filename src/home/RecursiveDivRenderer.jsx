import React, { useEffect, useState } from 'react';
import TutorialDisplay from './TutorialDisplay';

const RecursiveDivRenderer = ({ data, onItemClick }) => {
  
  const [expandedItems, setExpandedItems] = useState({});
  
  const handleItemClick = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId], 
    }))
    onItemClick(itemId);
  };

  return (
    <div key='home-container'>
      <div key='home-sidebar'>
        {data.map((item) => (
          <div key={item.id}>
            <div key={item.id} onClick={() => handleItemClick(item.id)}>
              {item.category}
            </div>
              {item.children && expandedItems[item.id] && (
                <RecursiveDivRenderer data={item.children} onItemClick={onItemClick} />
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecursiveDivRenderer;



