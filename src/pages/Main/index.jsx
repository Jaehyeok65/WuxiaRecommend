import React from 'react';
import MainFrame from '../MainFrame';
import MainCarousel from '../../organism/MainCarousel';
import MainList from '../../organism/MainList';

const Main = ( { list }) => {

    return(
        <MainFrame>
            <MainCarousel list = {list} />
            <MainList list={list} title='연재 추천'/>
            <MainList list={list} title='장르별 TOP10'/>
        </MainFrame>
    )


}

export default React.memo(Main);
