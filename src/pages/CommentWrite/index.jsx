import React, { useState, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { Formatting } from '../../api/CommentAPI';
import { CommentSubmit } from '../../api/CommentAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCommentSubmit } from '../../redux/action';

const WriteArea = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
`;

const TextArea = styled.textarea`
    width : 300px;
    height : 300px;
    margin-top : 1%;
`

const CommentWrite = ( { loginstate }) => {

    const [comment, setComment] = useState({
        wuxia : '',
        title : '',
        content : '',
        writer : document.cookie.split("=")[1] ? document.cookie.split("=")[1] : '',
        date : Formatting(new Date()),
        view : 0,
        recommend : 0
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(!loginstate) {
            window.alert("로그인이 필요합니다.");
            navigate('/community');
        }
    }, [])


    

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getCommentSubmit(comment,"최신순"));
        navigate(`/community`);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setComment({...comment,
            [name] : value
        });
    }


    return(
        <MainFrame>
            <form onSubmit={onSubmit}>
                <WriteArea>
                    <Input name="title" value={comment.title} onChange={onChange} />
                    <TextArea name="content" value={comment.content} onChange={onChange} />
                    <input className='submit' type="submit" value="전송" />
                </WriteArea>
            </form>
        </MainFrame>
    )
}


export default React.memo(CommentWrite);