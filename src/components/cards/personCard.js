import React from "react";
import defaultImage from "../../media/images/defaultprofile.png"
import "./style.css"
import styled from "styled-components";

const StyledPersonCard = styled.div`

  .movie-title {
      background-color: ${props => props.lightMode ? "rgba(235, 162, 53, 0.95)":"black"};
      transition: all 0.5s ease;
  }
  #card-title {
      color: ${props => props.lightMode ? "black": "white"}
  }
    #minor-text {
      color: ${props => props.lightMode ? "black": "white"}
  }
`;

const PersonCard = (props) => {
    var scale = props.scale
    if(scale > 1 ) {
        scale = 1;
    }
    var name = props.title;
    name = name.replaceAll(' ', '_');
    return (
        <StyledPersonCard lightMode = {props.lightMode} className="card" style={{transform: `scale(${scale})`}}>
            <a href={`https://en.wikipedia.org/wiki/${name}`} target="_blank" rel="noopener noreferrer">
                <div className="card-image">
                    {
                        props.image == null ? <img src={defaultImage} width="185px" alt="default" /> : <img src={`https://image.tmdb.org/t/p/w185/${props.image}`} alt="" /> 
                    }
                </div>
                <div className="movie-title"  style={{width:`185px`}}>
                    <div id="card-title"> {props.title} </div>
                    <div id="minor-text"> ({props.subtitle ? props.subtitle : 'Unknown'}) </div>
                </div>
            </a>
        </StyledPersonCard>

    )
};

export default PersonCard;