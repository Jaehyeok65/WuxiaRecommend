import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCommentRecommend,
    getCommentDelete,
    getComment,
} from '../../redux/action';
import Comment from '.';

const CommentContainer = ({ loginstate, nickname }) => {
    const { id } = useParams();
    const { data, loading, error } = useSelector(
        (state) => state.comment.comment[id]
    ) || {
        loading: false,
        data: null,
        error: null,
    };

    const dispatch = useDispatch();
    const memoizedDispatch = useCallback(dispatch, []);
    const navigate = useNavigate();
    const memoizedNavigate = useCallback(navigate, []);

    const onRecommendClick = useCallback(() => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            memoizedNavigate('/login');
            return;
        }
        memoizedDispatch(getCommentRecommend(data));
    }, [data]);

    const onRemoveClick = useCallback(async () => {
        const confirm = window.confirm('글을 삭제하시겠습니까?');
        if (confirm) {
            await memoizedDispatch(getCommentDelete(id, '최신순'));
            memoizedNavigate(`/community`);
        }
    }, [id]);

    useEffect(() => {
        //메뉴 전용
        if (data) return;
        memoizedDispatch(getComment(id));
    }, [memoizedDispatch, id, data]);

    return (
        <React.Fragment>
            <Comment
                data={data}
                loading={loading}
                error={error}
                nickname={nickname}
                onRemoveClick={onRemoveClick}
                onRecommendClick={onRecommendClick}
            />
        </React.Fragment>
    );
};

export default React.memo(CommentContainer);
