import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Button } from '../atoms/Button';
import { FaTimes } from 'react-icons/fa';



const slidein = keyframes`
    from {
        transform : translateX(-800px);
    }
    to {
        transform : translateX(0px);
    }
`;

const slidedown = keyframes`
    from {
        transform : translateX(0px);
    }
    to {
        transform : translateX(-800px);
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

const Sidebackground = styled.div`
    position : fixed;
    top : 0;
    width : 100vw;
    height : 100vh;
    color : gray;
    background : rgba(0,0,0,0.8);

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


const Sidebars = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    margin : 0;
    padding : 0;
    width : 40%;
    height : 100vh;
    background-color : white;
    
    animation-duration : 0.5s;
    animation-timing-function : ease-out;
    animation-name : ${slidein};

    ${props => 
        props.disappear && 
        css`
            animation-duration : 0.5s;
            animation-name : ${slidedown};
            animation-timing-function : ease-out;
        `}
`;

const Container = styled.div` //버튼 우측 정렬을 위한 컨테이너
    text-align : right;
`





const Sidebar = ({ onClicks, toggle }) => {

    //console.log(toggle);
    const [animate, setAnimate] = useState(false);
    const [localvisible, setLocalvisible] = useState(toggle);

    useEffect( () => {
        if(localvisible && !toggle) {
            setAnimate(true);
            setTimeout(() => setAnimate(false),400);
        }
        setLocalvisible(toggle);
    },[localvisible, toggle])
    


    const togglebtn = {
        margin : '4px 8px',
        padding : '4px 8px',
        borderRadius : '50%',
        fontSize : '20px',
        textAlign : 'right',
        width : '100%',
    };


    if(!animate && !localvisible) {
        return null;
    }
    return(
        <Sidebackground disappear={!toggle}>
            <Sidebars disappear={!toggle}>
                <Container>
                    <Button onClicks={onClicks} styled={togglebtn}><FaTimes /></Button>
                </Container>
            </Sidebars>
        </Sidebackground>
    )
    
}



export default Sidebar;