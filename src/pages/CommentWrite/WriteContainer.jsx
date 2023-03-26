import React, { useState, useEffect, useCallback } from 'react';
import { Formatting } from '../../api/CommentAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCommentSubmit } from '../../redux/action';
import CommentWrite from '.';

const WriteContainer = ({ loginstate, nickname }) => {
    const [comment, setComment] = useState({
        wuxia: '',
        title: '',
        content: '',
        writer: nickname,
        date: Formatting(new Date()),
        view: 0,
        recommend: 0,
    });

    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, []);
    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    useEffect(() => {
        if (!loginstate) {
            window.alert('로그인이 필요합니다.');
            navigate('/community');
        }
    }, []);

    useEffect(() => {
        setComment({ ...comment, writer: nickname });
    }, [nickname]);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (comment.title.trim() === '') {
                window.alert('제목을 입력하세요');
                return;
            }
            if (comment.content.trim() === '') {
                window.alert('내용을 입력하세요');
                return;
            }
            await memoizedDispatch(getCommentSubmit(comment, '최신순')); // 서버에 Comment 저장이 끝난 후 이동시키기 위해 await 지정
            memoizedNavigate(`/community`);
        },
        [comment]
    );

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setComment((prev) => ({ ...prev, [name]: value }));
    }, []);

    return (
        <React.Fragment>
            <CommentWrite
                comment={comment}
                onSubmit={onSubmit}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

export default React.memo(WriteContainer);
