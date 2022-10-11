import React, { useEffect, useRef } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Card from '../../molecule/Card';
import CardInfo from '../../molecule/CardInfo';

const Lists = styled.div`
    display : grid;
    grid-template-columns: repeat(4,1fr);
    gap : 40px 40px;
    margin-top : 5%;
    margin-bottom : 10%;

    @media screen and (max-width : 1000px) {
        grid-template-columns: repeat(2,1fr);
    }
`

const Grids = styled.div`
    display : grid;
    grid-template-columns: repeat(2,1fr);
    gap : 20px 20px;
    
    > div {
        align-self : center;
    }
`

const cardstyle = {
    height : '100%',
    mobileheight : '100%'
};

const cardinfostyle = {
    title : {
        marginBottom : '5%',
        fontSize : '14px'
    },
    subtext : {
        marginBottom : '5%',
        fontSize : '12px',
        color : 'gray'
    },
    icon : {
        fontSize : '15px'
    },
    span : {
        fontSize : '14px',
        verticalAlign : 'top',
        marginLeft : '8px'
    },
    text : {
        fontSize : '12px',
        marginTop : '5%'
    }

}

const List = ( { list=[] }) => {

    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것

    const scrollref = useRef();

    useEffect( () => {
        scrollref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    },[title])

    return(
        <MainFrame>
            <h2 style={{fontSize: '20px', marginTop : '2%'}} ref={scrollref}>{title}</h2>
            <Lists>
                { list && list.map( (item, index) => (
                    <Grids>
                        <Card key={index} url={item.url} title={item.title} styled={cardstyle}/>
                        <CardInfo product={item} styled={cardinfostyle} />
                    </Grids>
                ))}
            </Lists>
        </MainFrame>
    )

}


export default React.memo(List);