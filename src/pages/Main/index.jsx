import React from 'react';
import MainFrame from '../MainFrame';
import MainCarousel from '../../organism/MainCarousel';
import MainList from '../../organism/MainList';


const liststyle = {
    pcgrid : 'repeat(6,1fr)',
    mobilegrid : 'repeat(3,1fr)',
    gap : '40px 40px'
};

const Main = ( { list }) => {

    return(
        <MainFrame>
            <MainCarousel list = {list} />
            <MainList list={list} title='연재 추천' styled={liststyle}/>
            <MainList list={list} title='장르별 TOP10' styled={liststyle}/>
        </MainFrame>
    )


}

export default React.memo(Main);
