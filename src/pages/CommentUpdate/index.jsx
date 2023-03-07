import React, { useState, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import MainFrame from '../MainFrame';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentUpdate, getComment } from '../../redux/action';
import { useParams } from 'react-router-dom';

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

const CommentUpdate = ( { loginstate }) => {


    const { id } = useParams();
    const { data, loading, error } = useSelector(state => state.comment.comment[id]) || {
        loading: false,
        data: null,
        error: null
      };

    const [comment, setComment] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect( () => {
        if(!loginstate) {
            window.alert("로그인이 필요합니다.");
            navigate('/community');
        }
    }, []);


    useEffect(() => { //메뉴 전용
        if(data) {
            setComment(data);
            return;
        }
        dispatch(getComment(id));
      }, [dispatch, id, data]); 

    

    const onSubmit = async(e) => {
        e.preventDefault();
        if(comment.title.trim() === '') {
            window.alert("제목을 입력하세요");
            return;
        }
        if(comment.content.trim() === '') {
            window.alert("내용을 입력하세요");
            return;
        }
        await dispatch(getCommentUpdate(comment,"최신순"));
        navigate(`/comment/${comment.id}`);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setComment({...comment,
            [name] : value
        });
    }

    
    if (!data) return null;


    return(
        <React.Fragment>
        { comment && 
        <MainFrame>
            <form onSubmit={onSubmit}>
                <WriteArea>
                    <Input name="title" values={comment.title} onChange={onChange} />
                    <TextArea name="content" value={comment.content} onChange={onChange} />
                    <input className='submit' type="submit" value="전송" />
                </WriteArea>
            </form>
        </MainFrame>
         }
        </React.Fragment>
    )
}


export default React.memo(CommentUpdate);