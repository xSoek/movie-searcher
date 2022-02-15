import React from "react";
import votesIcon from '../../media/images/corny-votes.png';
import "./style.css"


const NoResults = () => {
    return (
        <div className="results-container">
            <img src={votesIcon} width="350px"alt=""/>
            <p id="resultsBoard">0 <br/>results found</p>
        </div>
    )
    
}

export default NoResults;