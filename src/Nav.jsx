import React from 'react'

export default function Nav() {
    const btnInfo = [
        {
            name: 'HOME',
            id: 1,
        },
        {
            name: 'ABOUT',
            id: 2,
        },
        {
            name: 'CONTACT',
            id: 3,
        },
        {
            name: 'PROFILE',
            id: 4,
        },
    ];
    const navBtns = btnInfo.map(btn =>
        <li><button key={btn.id}>{btn.name}</button></li>
    )
    return (
        <nav className="navbar">
            <ul>
                {navBtns}
            </ul>
        </nav>
    )
}