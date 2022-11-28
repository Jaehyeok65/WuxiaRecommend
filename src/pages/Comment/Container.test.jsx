import React from 'react';
import { render, API, create, waitFor } from "../../util/test";
import CommentContainer from './CommentContainer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getComment } from '../../redux/action';
import { Provider } from 'react-redux';







describe('Container Test', () => {
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
   

    describe('reducer data Update 확인',() => {
      it('comment 데이터가 reducer에 제대로 반영되었는지 확인', async () => {
        render(
          <Provider store={store}>
            <CommentContainer />
          </Provider>
        );
        await waitFor(() => store.dispatch(getComment(2)));
        const { comment } = store.getState().comment;
        expect(comment[2].data).toEqual(data);
      })
    })


})

