import React from "react";
import "./styles.css"
import githubIcon from "../../media/images/github.png"
import linkedinIcon from "../../media/images/linkedin.png"
import darkModeIcon from "../../media/images/darkmode.png"
import lightModeIcon from "../../media/images/lightmode.png"
import logo from "../../media/images/logo1.png"
import styled, { createGlobalStyle } from "styled-components";

const StyledNav = styled.div`
  background-color: ${props => props.lightMode ? "rgb(235, 162, 53)":"rgb(27, 19, 19)"};
  transition: all 1s ease;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.lightMode ? "rgba(240, 227, 202, 1)":"rgba(54, 34, 34, 1)"};
    transition: background-color 1s ease;
  }

  body::-webkit-scrollbar-thumb {
    background-color: ${props => props.lightMode ? "black":"rgb(235, 162, 53)"};
  }
`

const Nav = (props) => {
    return (

        <StyledNav lightMode={props.lightMode} className="navbar-container">
            <GlobalStyle lightMode={props.lightMode}/>
            <a href="/" className="brand-logo"> <img src={logo}  alt="" /> </a> 

            <img className="theme-mode" src={props.lightMode === true ? darkModeIcon : lightModeIcon } width="50px" alt="" onClick={props.changeTheme}/>

            <div className="navbar-social">
                <a href="https://www.linkedin.com/in/jorgedepazcabanas" target="_blank" rel="noreferrer" id="linkedin" className="social-icon"> <img src={linkedinIcon} width="60px"alt="" /> </a>
                <a href="https://github.com/xSoek" target="_blank" rel="noreferrer" id="github" className="social-icon"> <img src={githubIcon} width="60px" alt="" /> </a>                   
            </div>
        </StyledNav>
    );
};

export default Nav;