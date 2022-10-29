import React, { useEffect } from 'react';
import MainFrame from '../MainFrame';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getComment, getCommentDelete } from '../../redux/action';
import Title from '../../atoms/Title';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { FaThumbsUp } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { getCommentRecommend } from '../../redux/action';
import { Link } from 'react-router-dom';
import Icon from '../../atoms/Icon';
import { FaPen } from "react-icons/fa";


const Content = styled.div`
    margin-bottom : 10%;
`;

const Flex = styled.div`
    display : flex;
    justify-content : center;
`;

const Flex2 = styled.div`
    display : flex;
    justify-content : space-between;
    margin-top : 7%;
    margin-bottom: 5%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color : inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const Comment = ( { loginstate, setLoginToggle, nickname }) => {


    const { id } = useParams();
    const { data, loading, error } = useSelector(state => state.comment.comment[id]) || {
        loading: false,
        data: null,
        error: null
      }; 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onRecommendClick = () => {
        if(!loginstate) {
            window.alert("로그인이 필요한 기능입니다.");
            setLoginToggle();
            return;
        }
        dispatch(getCommentRecommend(data));
    };

    const onRemoveClick = () => {
        const confirm = window.confirm("글을 삭제하시겠습니까?");
        if(confirm){
            dispatch(getCommentDelete(id,'최신순'));
            navigate(`/community`);
        };
    };

    useEffect(() => { //메뉴 전용
        if(data) return;
        dispatch(getComment(id));
      }, [dispatch, id, data]); 

    

    
    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return(
        <MainFrame>
            { data && 
                <Content>
                    <Flex2>
                        <Title styled={{fontSize : '24px'}}>{data.title}</Title>
                        <div style={{width : '10%'}}>
                            <span style={{fontSize : '15px', color : 'gray'}}>{data.writer}</span> &nbsp;
                            { nickname === data.writer ? 
                            <span>
                                <StyledLink to={`/commentupdate/${data.id}`}>
                                    <Icon styled={{fontSize : '15px'}}><FaPen /></Icon>
                                </StyledLink> &nbsp;
                                    <Icon styled={{fontSize : '15px'}} setIcon={onRemoveClick}><FaTrashAlt /></Icon>
                            </span> : null}
                        </div>
                    </Flex2>
                    <pre style={{marginBottom : '10%', fontSize : '14px'}}>{data.content}</pre>
                    <Flex>
                        <Button styled={{width : '100px', padding : '12px', border : '1px solid gray', borderRadius : '3px'}} onClicks={onRecommendClick}> 
                            <FaThumbsUp /> {data.recommend}
                        </Button>
                    </Flex>
                </Content>
            }
        </MainFrame>
    )

}


export default React.memo(Comment);