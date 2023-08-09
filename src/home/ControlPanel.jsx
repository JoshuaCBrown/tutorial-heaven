import React from 'react'
import plus from '../assets/plus.png'
import arrow from '../assets/arrow.png'

export default function ControlPanel() {
    const conPanBtns = [
        {
            id: 1,
            imgAlt: 'Add a link',
            imgPath: plus,
            btnClass: 'con-pan-btn',
            handleClick: function() {
                console.log('plus');
            },
        },
        {
            id: 2,
            imgAlt: 'Add an arrow',
            imgPath: arrow,
            btnClass: 'con-pan-btn',
            handleClick: function() {
                console.log('arrow');
            },
        }
    ];

    return (
        // <div>
        //     {conPanBtns.map((item) => (
        //         // <div id={aBtn.id}>
        //         //     <button className={aBtn.btnClass} onClick={aBtn.handleClick}>
        //                 <img key={item.id} src={item.imgPath} />
        //             // </button>
        //         // </div>
        //     ))}
        // </div>
        <div>
            {conPanBtns.map((aBtn) => (
                <div id={aBtn.id}>
                    <button className={aBtn.btnClass} onClick={aBtn.handleClick}>
                        <img src={aBtn.imgPath} alt={aBtn.imgAlt} />
                    </button>
                </div>
            ))}
        </div>
    );
}