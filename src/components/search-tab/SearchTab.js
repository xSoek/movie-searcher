import React from "react";
import styled from "styled-components";
import "./style.css"

const StyledSearchTab = styled.input`
  background-color: ${props => props.lightMode ? "white":"rgba(66, 63, 62, 1)"};
  color: ${props => props.lightMode ? "black":"white"};
  ::placeholder {
    color: ${props => props.lightMode ? "black":"white"};
  }
  transition: all 1s ease;
`;

const StyledTotalResults = styled.p`
  color: ${props => props.lightMode ? "black":"white"};
`;

const SearchTab = (props) => {
    return (
        <section className="search-container">
            <form action="" onSubmit={props.handleSubmit}>
                <StyledSearchTab lightMode={props.lightMode} className="input-container" placeholder="Type a movie" type="text" onChange={props.handleChange} />
            </form>
            <StyledTotalResults lightMode={props.lightMode}> {props.totalResults !== 0 ? `Total Results: ${props.totalResults}` : ''} </StyledTotalResults>
        </section>
    );
};

export default SearchTab;