import React from "react";
import "./style.css"
import styled from "styled-components";

const StyledPagination = styled.div`
  background-color: ${props => props.lightMode ? "rgba(240, 227, 202, 0.95)":"rgba(54, 34, 34, 0.95)"};
  transition: all 1s ease;
`;


var multiplier = 0;

const Pagination = (props) => {

    const totalPages = props.pages;
    const buttonPages = [];
    if(props.resetMultiplier) {
        multiplier = 0;
    }
    setPagination(props, totalPages, buttonPages)
    return (
        <StyledPagination lightMode={props.lightMode} className="pagination">
            {buttonPages}
            {SetInitial(props.currentPage)}
        </StyledPagination>
    )
    
}


const nextButtons = (props, buttonPages) => {
    var initialValue;
    if(buttonPages[0].props.value !== "<<") {
        initialValue = buttonPages[0].props.value;
    } else {
        initialValue = buttonPages[1].props.value;
    }

    multiplier = multiplier + 5;
    props.nextPage(initialValue + 5);
}


const prevButtons = (props, buttonPages) => {
    var initialValue;
    if (buttonPages[0].props.value !== "<<") {
        initialValue = buttonPages[0].props.value;
    } else {
        initialValue = buttonPages[1].props.value;
    }

    multiplier = multiplier - 5;
    props.nextPage(initialValue - 1);
}

const SetInitial = (currentPage) => {
    var buttons = document.getElementsByClassName("pagination-btn");
    for (var index = 0; index < buttons.length; index++) {
        buttons[index].style.backgroundColor = 'rgb(51, 51, 51)';
        buttons[index].style.color = 'white';
        
        if(buttons[index].value === currentPage.toString()) {
            buttons[index].style.backgroundColor = 'rgb(235, 162, 53)';
            buttons[index].style.color = 'black';
        }
    }
}

const setPagination = (props, totalPages, buttonPages) => {

    let internalCounter = 0
    for (let index = 1 + multiplier; index <= totalPages; index++) {
        if(internalCounter !== 5) {
            if(index === props.currentPage) {
                buttonPages.push(<button className="pagination-btn" style={{backgroundColor:'rgb(235, 162, 53)', color:'black'}} key={index} onClick={(e) => { props.nextPage(index);} } value={index}> {index} </button>)
            } else {
                buttonPages.push(<button className="pagination-btn" style={{backgroundColor:'rgb(51, 51, 51)', color:'white'}} key={index} onClick={(e) => { props.nextPage(index);} } value={index}> {index} </button>)
            }
            
            internalCounter++;
        }
    }

    if(buttonPages[0].props.value > 5) {
        buttonPages.unshift(<button className="pagination-btn" style={{backgroundColor:'rgb(51, 51, 51)', color:'white'}}  key={"prev"} onClick={() => prevButtons(props, buttonPages, totalPages)} value={"<<"}> {'<<'} </button>)
    }

    if(totalPages > buttonPages[buttonPages.length-1].props.value) {
        buttonPages.push(<button className="pagination-btn" style={{backgroundColor:'rgb(51, 51, 51)', color:'white'}} key={"next"} onClick={() => nextButtons(props, buttonPages, totalPages)} value={">>"}> {'>>'} </button>)
    }
}

export default Pagination;