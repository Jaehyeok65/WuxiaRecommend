import React, { useEffect, useState, useRef } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Card from '../../molecule/Card';
import CardInfo from '../../molecule/CardInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../../redux/action';
import { getTotal } from '../../api/WuxiaAPI';
import ReactLoading from 'react-loading';



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

const Spinner = styled.div`
    display : flex;
    justify-content : center;
    margin-bottom : 5%;
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


export const handleScroll = () => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


const List = ( ) => {

    const { title } = useParams(); //title에 맞게 서버에 데이터 요청할 것
    const { data, loading, error } = useSelector(state => state.wuxia.list[title]) || {
        loading: false,
        data: null,
        error: null
      }; 
    const page = useRef({
        '조회순' : 1,
        '좋아요순' : 1,
        '별점순' : 1
    });
    const limit = 12;

    const [total, setTotal] = useState();
    const [bottom, setBottom] = useState(null);
    const dispatch = useDispatch();

    const observerCallback = ([entries]) => {
        
        if(entries.isIntersecting && page.current[title] * limit  < total) {
            page.current[title] += 1;
            dispatch(getPage(title,page.current));
        };
    };

    const option = { threshold : 0.25, rootMargin : '80px'};


	useEffect(() => {
		const observer = new IntersectionObserver(observerCallback, option);
		if (bottom) {
			observer.observe(bottom);
		}
		return () => {
			if (bottom) {
				observer.unobserve(bottom);
			}
		};
	}, [bottom]);
    
    


    const getTotals = async() => {
        const data = await getTotal();
        setTotal(data);
    }

    useEffect( () => {
        handleScroll();
        getTotals();
    },[title]);

    
    useEffect(() => { //메뉴 전용
        if(data) return;
        dispatch(getPage(title,page.current)); //초기에 데이터를 가져오기 위함
      }, [dispatch, title, data]);

      console.log(data);

    
      //if (loading) return <div>로딩중...</div>;
      if (error) return <div>에러 발생!</div>;
      if (!data) return null;

    return(
        <MainFrame>
            <h2 style={{fontSize: '20px', marginTop : '2%'}}>{title}</h2>
            <Lists>
                { data ? data.map( (item) => (
                    <Grids key={item.id}>
                        <Card url={item.url} title={item.title} styled={cardstyle}/>
                        <CardInfo product={item} styled={cardinfostyle} />
                    </Grids>
                )) : <div style={{height : '100vh'}}/>}
            </Lists>
            <div ref={setBottom} />
            { loading &&
                <Spinner style={{textAling : 'center'}}>
                    <ReactLoading type='spin' color='black' height={'5%'} width={'3%'} />
                </Spinner> }
        </MainFrame>
    )

}



export default React.memo(List);