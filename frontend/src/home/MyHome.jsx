import React, { useState } from 'react'
import { catStructure } from './Categories'
import RecursiveDivRenderer from './RecursiveDivRenderer'
import TutorialDisplay from './TutorialDisplay'
import './MyHome.css'
import ControlPanel from './ControlPanel' 

function MyHome() {
  
  const [divId, setDivId] = useState(null);

  const onItemClick = (itemId) => {
    setDivId(itemId)
  };

  return (
    <div>
      <div className='navbar'>
        <ControlPanel />
      </div>
      <div className='page-container'>
        <div className='sidebar'>
          <RecursiveDivRenderer data={catStructure} onItemClick={onItemClick} />
        </div>
        <div className="tutorial-display">
          <TutorialDisplay divId={divId}/>
        </div>
        
        {/* <DivCreator catStructure={catStructure} /> */}
      </div>
    </div>
  )
}

export default MyHome;