import { create, waitFor} from "../../util/test";
import { getCommentSubmit } from '../../redux/action';
import { Formatting } from '../../api/CommentAPI';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from "../../util/test";


describe('Write Container Test', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    const data = [{
      id : 2,
      title : '제목이 뭐니',
      content : '내용이 뭐니',
      writer : '호돌맨',
      data : '2022-10-27',
      view : 0,
      recommend : 0
    }];

    mock.onPost(`${API}/commentsave`).reply(200, data);

    mock.onPost(`${API}/commentlist`).reply(200, data);

    const { store } = create();

    const commentdata = {
        wuxia : '',
        title : '제목이 뭐니',
        content : '내용이 뭐니',
        writer : '호돌맨',
        date : Formatting(new Date()),
        view : 0,
        recommend : 0
    }

    it('getCommentSubmit이 Dispatch 되면, store에 성공적으로 반영된다.', async() => {

        await waitFor(() => store.dispatch(getCommentSubmit(commentdata, "최신순")));
        const { commentlist } = store.getState().comment;
        expect(commentlist['최신순'].data).toEqual(data);
        
    })

    
    
})