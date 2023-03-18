import React from 'react';
import styled from 'styled-components';
import Title from '../../atoms/Title';
import Carusel from '../../molecule/Carusel';

const Main = styled.div`
    margin-top : 2%;
    margin-bottom: 10%;
`;

const MainCarousel = ({ list }) => {
    return (
        <Main>
            <Title styled={{ marginBottom: '20px' }}>실시간 추천작</Title>
            {list && <Carusel list={list} />}
        </Main>
    );
};

export default React.memo(MainCarousel);
