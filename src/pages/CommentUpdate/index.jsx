import React, { useState, useEffect, useCallback } from 'react';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentUpdate, getComment } from '../../redux/action';
import { useParams } from 'react-router-dom';
import Error from '../../module/Error';

const WriteArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const TitleInput = styled.input`
    width: 100%;
    max-width: 600px;
    height: 40px;
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ContentTextArea = styled.textarea`
    width: 100%;
    max-width: 600px;
    height: 300px;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.input`
    width: 100px;
    height: 40px;
    background-color: #0077ff;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #0055cc;
    }

    &:active {
        transform: translateY(2px);
    }
`;

const CommentUpdate = ({ loginstate }) => {
    const { id } = useParams();
    const { data, loading, error } = useSelector(
        (state) => state.comment.comment[id]
    ) || {
        loading: false,
        data: null,
        error: null,
    };

    const [comment, setComment] = useState(null);
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
        //메뉴 전용
        if (data) {
            setComment(data);
            return;
        }
        memoizedDispatch(getComment(id));
    }, [memoizedDispatch, id, data]);

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
            await memoizedDispatch(getCommentUpdate(comment, '최신순'));
            memoizedNavigate(`/comment/${comment.id}`);
        },
        [comment]
    );

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setComment((prev) => ({ ...prev, [name]: value }));
    }, []);

    if (!data) return null;
    if (error) return <Error error={error} />;

    return (
        <React.Fragment>
            {comment && (
                <MainFrame>
                    <form onSubmit={onSubmit}>
                        <WriteArea>
                            <TitleInput
                                name="title"
                                value={comment.title}
                                onChange={onChange}
                            />
                            <ContentTextArea
                                name="content"
                                value={comment.content}
                                onChange={onChange}
                            />
                            <SubmitButton type="submit" value="전송" />
                        </WriteArea>
                    </form>
                </MainFrame>
            )}
        </React.Fragment>
    );
};

export default React.memo(CommentUpdate);
