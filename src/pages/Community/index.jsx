import React, { useState, useEffect } from 'react';
import MainFrame from '../MainFrame';
import CommentLists from '../../molecule/CommentLists';
import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getCommentList } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../../molecule/Pagination';
import { handleScroll } from '../List';

const Navi = styled.div`
    display : flex;
    justify-content : space-between;
    margin-bottom : 2%;
    margin-top : 5%;
`;

const Page = styled.div`
    display : flex;
    justify-content : center;
    margin-top : 5%;
    margin-bottom : 5%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color : inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;



const Community = ( { loginstate, setLoginToggle }) => {

    const [Selected, setSelected] = useState("최신순");

    const { data, loading, error } = useSelector(state => state.comment.commentlist[Selected]) || {
        loading: false,
        data: null,
        error: null
      }; 
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const dispatch = useDispatch();
    const selectList = ["최신순", "추천순", "조회순"];

    useEffect(() => {
        if(data) return;
        dispatch(getCommentList(Selected));
      }, [dispatch, Selected, data]); //Selected가 변경될 때마다 dispatch 수행 == 이미 data가 존재하면 불필요한 dispatch방지

    useEffect(() => {
        handleScroll();
    },[page])

    const handleSelect = (e) => {
        setSelected(e.target.value);
        setPage(1); //페이지를 1페이지로 바꿈
    };

    const isLoginToggle = () => {
        window.alert("로그인이 필요한 기능입니다.");
        setLoginToggle();
    }

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return(
        <MainFrame>
            <Navi>
                <select onChange={handleSelect} value={Selected}>
                    {selectList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>
                { loginstate ? 
                    <StyledLink to='/commentwrite'>
                        <Icon styled={{fontSize : '18px'}}><FaPen /></Icon>
                    </StyledLink> : 
                    <Icon styled={{fontSize : '18px'}} setIcon={isLoginToggle}><FaPen /></Icon>
                    }
            </Navi>
            { data && data.slice(offset,offset + limit).map(item => (
                <StyledLink to={`/comment/${item.id}`} key={item.id}>
                    <CommentLists title={item.title} id={item.id} writer={item.writer} date={item.date} recommend={item.recommend} />
                </StyledLink>
            ))}
            <Page>
                <Pagination total={data.length} limit={limit} page={page} setPage={setPage} />
            </Page>
        </MainFrame>
    )
}


export default React.memo(Community);