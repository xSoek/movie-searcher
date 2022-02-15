import React from "react";

import "./style.css"

const setBackgroundColor = (id) => {

    var color = id * 3;
    return 'hsl(' + color + ', 100%, 47%)';
};

const TagCard = (props) => {
    return (
        <div className="tag-container" style={{backgroundColor: setBackgroundColor(props.id)}}>
            <p id="tag-name">{props.title}</p>
        </div>
    )
    
}


export default TagCard;