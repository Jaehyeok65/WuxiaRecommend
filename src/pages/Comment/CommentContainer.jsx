import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoginModal } from '../../redux/reducers/modal';
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
    const navigate = useNavigate();

    const LoginToggle = (data) => dispatch(LoginModal(data));

    const onRecommendClick = () => {
        if (!loginstate) {
            window.alert('로그인이 필요한 기능입니다.');
            LoginToggle(true);
            return;
        }
        dispatch(getCommentRecommend(data));
    };

    const onRemoveClick = async () => {
        const confirm = window.confirm('글을 삭제하시겠습니까?');
        if (confirm) {
            await dispatch(getCommentDelete(id, '최신순'));
            navigate(`/community`);
        }
    };

    useEffect(() => {
        //메뉴 전용
        if (data) return;
        dispatch(getComment(id));
    }, [dispatch, id, data]);

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
