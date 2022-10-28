import React, { useState, useEffect } from 'react';
import MainFrame from '../MainFrame';
import CommentLists from '../../molecule/CommentLists';
import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { FaPen } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getCommentList } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';

const Navi = styled.div`
    display : flex;
    justify-content : space-between;
    margin-bottom : 2%;
    margin-top : 5%;
`

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

    const dispatch = useDispatch();
    const selectList = ["최신순", "추천순", "조회순"];

    useEffect(() => {
        if(data) return;
        dispatch(getCommentList(Selected));
      }, [dispatch, Selected, data]); //Selected가 변경될 때마다 dispatch 수행 == 이미 data가 존재하면 불필요한 dispatch방지

    const handleSelect = (e) => {
        setSelected(e.target.value);
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
            { data && data.map(item => (
                <StyledLink to={`/comment/${item.id}`} key={item.id}>
                    <CommentLists title={item.title} id={item.id} writer={item.writer} date={item.date} recommend={item.recommend} />
                </StyledLink>
            ))}
        </MainFrame>
    )
}


export default React.memo(Community);