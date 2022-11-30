import React, { useState, useEffect } from 'react';
import { Formatting } from '../../api/CommentAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCommentSubmit } from '../../redux/action';
import CommentWrite from '.';


const WriteContainer = ( { loginstate, nickname}) => {

    const [comment, setComment] = useState({
        wuxia : '',
        title : '',
        content : '',
        writer : nickname,
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

    useEffect(() => {
        setComment({...comment, writer : nickname});
    },[nickname]);



    

    const onSubmit = (e) => {
        e.preventDefault();
        if(comment.title.trim() === '') {
            window.alert("제목을 입력하세요");
            return;
        }
        if(comment.content.trim() === '') {
            window.alert("내용을 입력하세요");
            return;
        }
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
        <React.Fragment>
            <CommentWrite comment={comment} onSubmit={onSubmit} onChange={onChange} />
        </React.Fragment>
    )
}

export default React.memo(WriteContainer);