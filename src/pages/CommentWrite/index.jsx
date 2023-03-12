import React from 'react';
import { Input } from '../../atoms/Input';
import MainFrame from '../MainFrame';
import styled from 'styled-components';

const WriteArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextArea = styled.textarea`
    width: 300px;
    height: 300px;
    margin-top: 1%;
`;

const CommentWrite = ({ comment, onSubmit, onChange }) => {
    return (
        <MainFrame>
            <form onSubmit={onSubmit}>
                <WriteArea>
                    <Input
                        name="title"
                        value={comment.title}
                        onChange={onChange}
                    />
                    <TextArea
                        name="content"
                        value={comment.content}
                        onChange={onChange}
                    />
                    <input className="submit" type="submit" value="전송" />
                </WriteArea>
            </form>
        </MainFrame>
    );
};

export default React.memo(CommentWrite);
