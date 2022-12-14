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
import { FaArrowUp } from "react-icons/fa";



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
`;

const Btn = styled.button`
    position : fixed;
    border : none;
    text-align : center;
    z-index : 9999999;
    background-color : white;
    &:hover {
        transform : translateY(-4px);
        cursor : pointer;
    };

    @media screen and (max-width : 2000px) {
        right : 20px;
        bottom : 50%;
        font-size : 22px;
    }

    @media screen and (max-width : 800px) {
        bottom : 20px;
        right : 50%;
        font-size : 16px;
    }
    
`;

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
    // ?????? ????????? ?????? ???????????? ?????? return
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


const List = ( ) => {

    const { title } = useParams(); //title??? ?????? ????????? ????????? ????????? ???
    const callbacktitle = useRef(title); //ObserverAPI title ????????? ref
    const { data, loading, error } = useSelector(state => state.wuxia.list[title]) || {
        loading: false,
        data: null,
        error: null
      }; 
    const page = useRef(useSelector(state => state.wuxia.page) || {
        '?????????' : 1,
        '?????????' : 1,
        '????????????' : 1
    });

    const limit = 12;

    const total = useRef(0);
    const [bottom, setBottom] = useState(null);
    const dispatch = useDispatch();

   

    const observerCallback = ([entries]) => {

        if(entries.isIntersecting && page.current[callbacktitle.current] * limit  < total.current) {
            page.current[callbacktitle.current] += 1;
            dispatch(getPage(callbacktitle.current,page.current));
            dispatch({ type : 'PAGE', data : page.current[callbacktitle.current], title : callbacktitle.current});
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
        total.current = data;
    };

    useEffect( () => {
        callbacktitle.current = title; // ObserverAPI??? title ?????? ???????????? ???????????? ref??? title??? ??????
        handleScroll();
        getTotals();
    },[title]);

    
    useEffect(() => { //?????? ??????
        if(data) return;
        dispatch(getPage(title,page.current)); //????????? ???????????? ???????????? ??????
      }, [dispatch, title, data]);


    
      if (error) return <div>?????? ??????!</div>;
      if (!data) return null;

    return(
        <MainFrame>
            <h2 id = {'viewPort'} style={{fontSize: '20px', marginTop : '2%'}}>{title}</h2>
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
            <Btn onClick={handleScroll}><FaArrowUp /></Btn>
        </MainFrame>
    )

}



export default React.memo(List);