import React from 'react';
import { API, create, screen, fireEvent, RouterRender } from "../../util/test";
import CommentUpdate from '.';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';



describe('CommentUpdate Test', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    const data = {
      id : 2,
      title : '제목을 테스트',
      content : '내용 테스트',
      writer : '호돌맨',
      data : '2022-10-27',
      view : 0,
      recommend : 0
    };


    mock.onPost(`${API}/comment`).reply(200, data);

    
    const { store } = create();


    it('Comment가 있다면, Comment 입력창이 보이며, 정상적으로 value가 업데이트 되어있다.', async () => {
        RouterRender(
        <Provider store={store}>
            <CommentUpdate loginstate={true} />
        </Provider>, {
            path : '/commentupdate/:id',
            initial : '/commentupdate/2'
        });

       await screen.findByDisplayValue('내용 테스트');
       await screen.findByDisplayValue('제목을 테스트');
    })

    it('Comment가 있다면, Comment 입력창이 보이며, Input value를 변경했을 때, 정상적으로 변경이 된다.', async () => {
        RouterRender(
        <Provider store={store}>
            <CommentUpdate loginstate={true} />
        </Provider>, {
            path : '/commentupdate/:id',
            initial : '/commentupdate/2'
        });

       const title = await screen.findByDisplayValue('내용 테스트');
       const content = await screen.findByDisplayValue('제목을 테스트');
       fireEvent.change(title, { target : { value : '제목 변경'}});
       fireEvent.change(content, { target : { value : '내용 변경'}});
       expect(title.value).toBe('제목 변경');
       expect(content.value).toBe('내용 변경');
    })

    it('Comment가 있다면, Comment 입력창이 보이며, 버튼을 눌렀을 때 Submit이 정상적으로 작동이 된다.', async () => {
        RouterRender(
        <Provider store={store}>
            <CommentUpdate loginstate={true} />
        </Provider>, {
            path : '/commentupdate/:id',
            initial : '/commentupdate/2'
        });

        const btn = await screen.findByDisplayValue('전송');
        fireEvent.click(btn);
    })
})