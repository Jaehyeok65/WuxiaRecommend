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
    grid-template-columns: ${props => props.styled ? props.styled.pcgrid : 'repeat(2,1fr)'};
    gap: ${props => props.styled ? props.styled.gap : '20px 20px'};

    @media screen and (max-width: 600px) {
        grid-template-columns: ${props => props.styled ? props.styled.mobilegrid : 'repeat(2,1fr)'};
    }
`

const MainList = ( { list, title, styled }) => {



    return(
        <Main>
            <Title styled={{marginBottom : '20px'}}>{ title }</Title>
            <Grid styled={styled}>
            { list && list.map((item,index) => (
                <Card key={index} imgsrc={item.url} title={item.title} subtitle={item.subtitle} />
            ))}
            </Grid>
        </Main>
    )
}




export default React.memo(MainList);