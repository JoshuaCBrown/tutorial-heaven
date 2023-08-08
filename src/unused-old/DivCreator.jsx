import React from 'react'
import { useState } from 'react'



export default function DivCreator({ catStructure }) {
    const [isVisible, setIsVisible] = useState(false);
    // function handleClick(myid) {
    //     setIsVisible(!isVisible);
    // };
    
    return (
        <div>
            {catStructure.map((item) => {
                return (
                    <div key={item.id} onClick={handleClick(item)}><span>{item.category}</span>
                    {isVisible ? (
                        item.children && <DivCreator catStructure={item.children} />
                    ) : (
                        <></>
                    )}
                    </div>
                );
            })}
        </div>
    );
    //     <div>
    //         {catStructure.map((item) => {
    //             <div key={item.id} onClick={handleClick}>
    //                 {item.category}
    //                 {isVisible ? (
    //                     item?.children?.map((child) => {
    //                         return (
    //                             <div>
    //                                 <DivCreator catStructure={child}/>
    //                             </div>
    //                         );
    //                     })
    //                 ) : (
    //                     <></>
    //                 )}            
    //             </div>
    //             })
    //         };
    //     </div>
    // )
};