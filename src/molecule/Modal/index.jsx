import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';




const slideup = keyframes`
    from {
        transform : translateY(200px);
    }
    to {
        transform : translateY(0px);
    }
`;

const slidedown = keyframes`
    from {
        transform : translateY(0px);
    }
    to {
        transform : translateY(200px);
    }
`;

const fadein = keyframes`
    from {
        opacity : 0
    }
    to {
        opacity : 1
    }
`;

const fadeout = keyframes`
    from {
        opacity : 1
    }
    to {
        opacity : 0
    }
`;

const BackgroundModal = styled.div`
    position : fixed;
    top : 0;
    width : 100vw;
    height : 100vh;
    color : gray;
    background : rgba(0,0,0,0.8);
    z-index : 29999;

    animation-duration : 0.5s;
    animation-timing-function : ease-out;
    animation-name : ${fadein};

    ${props => 
        props.disappear && 
        css`
            animation-duration : 0.5s;
            animation-name : ${fadeout};
            animation-timing-function : ease-out;
    `}
`;

const Modals = styled.div`
    position : absolute;
    top : 20%;
    left : 34%;
    margin : 0;
    padding : 0;
    width : 33%;
    height : 60vh;
    background-color : white;
    z-index : 29999;

    animation-duration : 0.5s;
    animation-timing-function : ease-out;
    animation-name : ${slideup};

    ${props => 
        props.disappear && 
        css`
            animation-duration : 0.5s;
            animation-name : ${slidedown};
            animation-timing-function : ease-out;
    `}
`;





const Modal = ( { toggle, children }) => {

    const [animate, setAnimate] = useState(false);
    const [localvisible, setLocalvisible] = useState(toggle);

    useEffect( () => {
        if(localvisible && !toggle) {
            setAnimate(true);
            setTimeout(() => setAnimate(false),400);
        }
        setLocalvisible(toggle);
    },[localvisible, toggle]);

    if(!animate && !localvisible) {
        return null;
    }

    return(
        <BackgroundModal disappear={!toggle}>
            <Modals disappear={!toggle}>
                { children }
            </Modals>
        </BackgroundModal>
    )

}






export default React.memo(Modal);