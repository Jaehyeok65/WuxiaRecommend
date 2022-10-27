import React, { useEffect } from 'react';
import MainFrame from '../MainFrame';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getComment } from '../../redux/action';



const Comment = () => {

    const { id } = useParams();
    const { data, loading, error } = useSelector(state => state.comment.comment[id]) || {
        loading: false,
        data: null,
        error: null
      }; 
    const dispatch = useDispatch();

    console.log(data);

    useEffect(() => { //메뉴 전용
        if(data) return;
        dispatch(getComment(id)); //검색결과랑 겹치는 경우를 방지해서 input이 undefined 일때만 dispatch하도록 변경
      }, [dispatch, id, data]); //input이 변경될 때는 실행할 필요없으므로 의존성 추가 x

    
    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;

    return(
        <MainFrame>
            { data && 
                <div>
                <p>{data.title}</p>
                <p>{data.content}</p>
                </div>
            }
        </MainFrame>
    )

}


export default React.memo(Comment);