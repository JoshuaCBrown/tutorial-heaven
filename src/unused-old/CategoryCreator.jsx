import React from 'react'

export default function CategoryCreator(props) {
    const categories = props.categories;
    const categoryList = categories.map(category =>
        <li key = {category.key}><div className="mainCategory"><h1>{category.title}</h1><p>{category.description}</p></div>{category.children}</li>    
    )
    return (
        <div className="categoryDiv">
            <ul>
                {categoryList}
            </ul>
        </div>
    );
}