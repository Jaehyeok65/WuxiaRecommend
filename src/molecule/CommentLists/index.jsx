import React from 'react';
import styled from 'styled-components';
import { FaThumbsUp } from "react-icons/fa";



const List = styled.div`
    border : 1px solid gray;
    border-radius : 4px;
    overflow : hidden;
    height : 100%;
    width : 100%;
    max-height : 200px;
    padding : 5px;
    margin-bottom : 10px;
    display : flex;
    justify-content : space-between;
    &:hover {
        background-color : lightgray;
        cursor : pointer;
    };

    @media screen and (max-width : 800px) {
        flex-direction : column;
        
        div:nth-child(2) {
            text-align : right;
        }
    }
`;



const CommentLists = ( { id, title, writer, date, recommend }) => {


    return(
        <List>
            <p>
            {title}
            </p>
            <div>
                <p>{writer} <span style={{color : 'gray'}}>{date && date.slice(0,10)}</span> <span style={{color : 'blue'}}><FaThumbsUp/> {recommend}</span></p>
            </div>
        </List>
    )
}

export default React.memo(CommentLists);