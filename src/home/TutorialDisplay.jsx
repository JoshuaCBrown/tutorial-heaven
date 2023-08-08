import React, { useState } from 'react'

export default function TutorialDisplay({ divId }) {
    console.log(divId)
    return (
        <div>
            <h1>{divId}</h1>
        </div>
    )
}