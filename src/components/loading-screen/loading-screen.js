import React from "react";
import loadingIcon from '../../media/images/corny-happy.png';
import "./style.css"
import styled from "styled-components";

const StyledLoadingScreen = styled.div`
    color: ${props => props.lightMode ? "black":"white"};
  

`;

const LoadingScreen = (props) => {

    return (
        <StyledLoadingScreen lightMode={props.lightMode} className="loading-container">
            <img src={loadingIcon}  width="350px"alt=""/>
            <h2 className="loading-text">
                 L  O  A  D  I  N  G  <span> . </span> <span> . </span> <span> . </span>
            </h2>

        </StyledLoadingScreen>
    )
    
}

export default LoadingScreen;