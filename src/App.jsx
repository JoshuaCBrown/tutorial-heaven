import React, { useState } from 'react'
import { catStructure } from './home/fuckaround'
import RecursiveDivRenderer from './home/RecursiveDivRenderer'
import TutorialDisplay from './home/TutorialDisplay'
import './App.css'

function App() {
  
  const [divId, setDivId] = useState(null);

  const onItemClick = (itemId) => {
    setDivId(itemId)
  };

  return (
    <div className='page-container'>
      <div>
        <RecursiveDivRenderer data={catStructure} onItemClick={onItemClick} />
      </div>
      <div className="tutorial-display">
        <TutorialDisplay divId={divId}/>
      </div>
      {/* <DivCreator catStructure={catStructure} /> */}
    </div>
  )
}

export default App;
