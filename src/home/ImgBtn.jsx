import React from 'react'

export default function ImgBtn ({ handleClick, anImg, imgAlt, btnClass }) {
    return (
        <button className={btnClass} onClick={handleClick}>
            <img src={anImg} alt={imgAlt} />
        </button>
    );
}

