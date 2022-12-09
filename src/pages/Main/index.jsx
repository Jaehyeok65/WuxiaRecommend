import React from 'react';
import MainFrame from '../MainFrame';
import MainCarousel from '../../organism/MainCarousel';
import MainList from '../../organism/MainList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMain } from '../../redux/action';


const liststyle = {
    pcgrid : 'repeat(6,1fr)',
    tabletgrid : 'repeat(4,1fr)',
    mobilegrid : 'repeat(3,1fr)',
    gap : '20px 40px'
};


const Main = () => {

  const { data, loading, error } = useSelector(state => state.wuxia.main) || {
    loading: false,
    data: null,
    error: null
  }; 
  const dispatch = useDispatch();

    

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


     useEffect(() => {
      if(data) return;
      dispatch(getMain());
      }, [dispatch, data]);



    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return(
        <MainFrame>
            <MainCarousel list = {data[0]} />
            <MainList list={data[0]} title='조회수 TOP 12' styled={liststyle}/>
            <MainList list={data[1]} title='좋아요 TOP 12' styled={liststyle}/>
            <MainList list={data[2]} title='별점 TOP 12' styled={liststyle}/>
        </MainFrame>
    )


}

export default React.memo(Main);
