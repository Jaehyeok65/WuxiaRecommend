import React from 'react';
import { screen, fireEvent, render } from "../../util/test";
import CommentWrite from '.';


describe('Comment Write View Test', () => {

    const commentdata = {
        wuxia : '',
        title : '제목이 뭐니',
        content : '내용이 뭐니',
        writer : '호돌맨',
        date : '2022-11-30',
        view : 0,
        recommend : 0
    }

    const onChange= jest.fn();

    const onSubmit = jest.fn();

    it('Comment Props Test', () => {
        render(<CommentWrite comment={commentdata} onChange={onChange} onSubmit={onSubmit} />);
        screen.getByDisplayValue('제목이 뭐니');
        screen.getByDisplayValue('내용이 뭐니');
    });

    it('Comment onChange Test', () => {
        render(<CommentWrite comment={commentdata} onChange={onChange} onSubmit={onSubmit} />);
        const title = screen.getByDisplayValue('제목이 뭐니');
        const content = screen.getByDisplayValue('내용이 뭐니');
        fireEvent.change(title, { target : { value : '제목을 변경함'}});
        fireEvent.change(content, { target : { value : '내용을 변경함'}});
        expect(onChange).toBeCalled();
    });

    it('Comment onSubmit Test', () => {

        onSubmit.mockImplementation(event => {
            event.preventDefault();
          });
          
        render(<CommentWrite comment={commentdata} onChange={onChange} onSubmit={onSubmit} />);
        const btn = screen.getByDisplayValue('전송');
        fireEvent.click(btn);
        expect(onSubmit).toBeCalled();
    })


})