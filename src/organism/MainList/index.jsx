import React from 'react';
import Title from '../../atoms/Title';
import styled from 'styled-components';
import Card from '../../molecule/Card';

const Main = styled.div`
    margin-bottom : 10%;
`

const Grid = styled.div`
    margin-bottom : 50px;
    display : grid;
    grid-template-columns: repeat(6,1fr);
    gap: 40px 40px;
`

const MainList = ( { list }) => {


    return(
        <Main>
            <Title styled={{marginBottom : '20px'}}>연재 추천</Title>
            <Grid>
            { list && list.map((item,index) => (
                <Card key={index} imgsrc={item.url} title={item.title} subtitle={item.subtitle} />
            ))}
            </Grid>
        </Main>
    )
}




export default React.memo(MainList);