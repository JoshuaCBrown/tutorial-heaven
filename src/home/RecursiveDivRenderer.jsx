import React, { useEffect, useState } from 'react';
import './RecursiveDivRenderer.css';

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
      <div className='home-sidebar'>
        {data.map((item) => (
          <div key={item.id} className='category-container'>
              <div className='category' key={item.id} onClick={() => handleItemClick(item.id)}>
                {item.category}
              </div>    
              <div key='wholechild' className='childdiv'>
                {item.children && expandedItems[item.id] && (
                  <RecursiveDivRenderer data={item.children} onItemClick={onItemClick} />
                )}           
              </div> 
          </div>
        ))}
      </div>
  );
};

export default RecursiveDivRenderer;









