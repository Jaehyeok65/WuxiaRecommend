import React from 'react';
import { render, API, create, waitFor, screen, fireEvent } from "../../util/test";
import CommentContainer from './CommentContainer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getComment, getCommentDelete } from '../../redux/action';
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

    describe('nickname과 writer이 같으면 삭제 아이콘이 보인다', () => {
      it('nickname과 writer이 같은 경우 삭제 아이콘이 보인다', () => {
        render(
          <Provider store={store}>
            <CommentContainer nickname='호돌맨' />
          </Provider>
        );

        screen.getByTestId("remove");
      })
    })

    describe('버튼을 클릭하면 글이 삭제가 된다.', () => {
      it('버튼이 제대로 클릭이 된다.', async () => {
        const jsdomconfirm = window.confirm;  // remember the jsdom alert
        window.confirm = () => true;
        render(
          <Provider store={store}>
            <CommentContainer nickname='호돌맨' />
          </Provider>
        );

        await fireEvent.click(screen.getByTestId("remove"));
        window.confirm = jsdomconfirm;
      })
    })

    it('DeleteComment가 dispatch가 되면 reducer에서 해당 데이터가 제거된다', async() => {
      render(
        <Provider store={store}>
          <CommentContainer nickname='호돌맨' />
        </Provider>
      );
      await waitFor(() => store.dispatch(getCommentDelete(2,'최신순')));
      const { comment } = store.getState().comment;
      expect(comment[2]).not.toEqual(data);
      

      
    })


})

