import React, { useEffect } from 'react';
import MainFrame from '../MainFrame';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getComment } from '../../redux/action';
import Title from '../../atoms/Title';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { FaThumbsUp } from "react-icons/fa";
import { getCommentRecommend } from '../../redux/action';


const Content = styled.div`
    margin-bottom : 10%;
`;

const Flex = styled.div`
    display : flex;
    justify-content : center;
`;



const Comment = ( { loginstate, setLoginToggle }) => {

    const { id } = useParams();
    const { data, loading, error } = useSelector(state => state.comment.comment[id]) || {
        loading: false,
        data: null,
        error: null
      }; 
    const dispatch = useDispatch();

    const onRecommendClick = () => {
        if(!loginstate) {
            window.alert("로그인이 필요한 기능입니다.");
            setLoginToggle();
            return;
        }
        dispatch(getCommentRecommend(data));
    }

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
                    <Title styled={{marginBottom : '7%', marginTop : '5%', fontSize : '24px'}}>{data.title}</Title>
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