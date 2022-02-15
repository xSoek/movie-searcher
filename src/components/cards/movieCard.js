import React from "react";
import defaultImage from "../../media/images/defaultfilm.png"
import "./style.css"
import styled from "styled-components";

const StyledMovieCard = styled.div`

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


const MovieCard = (props) => {
    return (
        <StyledMovieCard lightMode={props.lightMode} className="card" onClick={() => props.viewMovieInfo(props.movieId)}>
            <div className="card-image">
                {
                    props.image == null ? <img src={defaultImage} width={`${props.size}px`} alt="default" /> : <img src={`https://image.tmdb.org/t/p/w${props.size}/${props.image}`} alt="" /> 
                }
            </div>
            <div className="movie-title" style={{width:`${props.size}px`}}>
                <div id="card-title"> {props.title} </div>
                <div id="minor-text"> ({props.release_date ? props.release_date.substring(0,4) : 'Unknown'}) </div>
            </div>
        </StyledMovieCard>

    )
};

export default MovieCard;