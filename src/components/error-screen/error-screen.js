import React from "react";
import errorIcon from '../../media/images/corny-error.png';
import "./style.css"
import styled from "styled-components";

const StyledErrorScreen = styled.div`
    color: ${props => props.lightMode ? "black":"white"};
  

`;
const ErrorScreen = (props) => {
    console.log("Loading");
    return (
        <StyledErrorScreen lightMode={props.lightMode} className="error-container">
            <img src={errorIcon}  width="350px"alt=""/>
            <h2 className="error-text">
                An unexpected error has ocurred, try again or contact me using the links above
            </h2>

        </StyledErrorScreen>
    )
    
}

export default ErrorScreen;