import React from 'react';
import MainFrame from '../MainFrame';
import MainCarousel from '../../organism/MainCarousel';
import MainList from '../../organism/MainList';
import { useEffect } from 'react';


const liststyle = {
    pcgrid : 'repeat(6,1fr)',
    tabletgrid : 'repeat(4,1fr)',
    mobilegrid : 'repeat(3,1fr)',
    gap : '20px 40px'
};

const Main = ( { list }) => {

    const handleScroll = () => {
        if (!window.scrollY) return;
        // 현재 위치가 이미 최상단일 경우 return
      
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      
      };

      useEffect( () => {
        handleScroll();
      },[]);

    return(
        <MainFrame>
            <MainCarousel list = {list} />
            <MainList list={list} title='조회수 TOP 12' styled={liststyle}/>
            <MainList list={list} title='좋아요 TOP 12' styled={liststyle}/>
            <MainList list={list} title='별점 TOP 12' styled={liststyle}/>
        </MainFrame>
    )


}

export default React.memo(Main);
