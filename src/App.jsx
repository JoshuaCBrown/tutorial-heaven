import React, { useState } from 'react'
import { catStructure } from './home/categories'
import RecursiveDivRenderer from './home/RecursiveDivRenderer'
import TutorialDisplay from './home/TutorialDisplay'
import './App.css'
import ControlPanel from './home/ControlPanel' 

function App() {
  
  const [divId, setDivId] = useState(null);

  const onItemClick = (itemId) => {
    setDivId(itemId)
  };

  return (
    <div className='page-container'>
      <div className='sidebar'>
        <RecursiveDivRenderer data={catStructure} onItemClick={onItemClick} />
      </div>
      <div className="tutorial-display">
        <TutorialDisplay divId={divId}/>
      </div>
      <div>
        <ControlPanel />
      </div>
      {/* <DivCreator catStructure={catStructure} /> */}
    </div>
  )
}

export default App;
