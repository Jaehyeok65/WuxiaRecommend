import React, { useEffect } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Card from '../../molecule/Card';
import CardInfo from '../../molecule/CardInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from '../../redux/action';



const Lists = styled.div`
    display : grid;
    grid-template-columns: repeat(4,1fr);
    gap : 40px 40px;
    margin-top : 5%;
    margin-bottom : 10%;



    @media screen and (max-width : 1200px) {
        grid-template-columns: repeat(3,1fr);
    }

    @media screen and (max-width : 800px) {
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
        fontSize : '15px',
        color : 'red'
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



const List = ( ) => {

    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const { data, loading, error } = useSelector(state => state.wuxia.list[title]) || {
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
    },[title]);

    useEffect(() => {
        if(data) return;
        dispatch(getList(title));
      }, [dispatch,title,data]);


      if (loading) return <div>로딩중...</div>;
      if (error) return <div>에러 발생!</div>;
      if (!data) return null;

    return(
        <MainFrame>
            <h2 style={{fontSize: '20px', marginTop : '2%'}}>{title}</h2>
            <Lists>
                { data && data.map( (item, index) => (
                    <Grids key={index}>
                        <Card url={item.url} title={item.title} styled={cardstyle}/>
                        <CardInfo product={item} styled={cardinfostyle} />
                    </Grids>
                ))}
            </Lists>
        </MainFrame>
    )

}



export default React.memo(List);