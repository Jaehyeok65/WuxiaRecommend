import { create, waitFor, render} from "../../util/test";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from "../../util/test";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ReduxThunk from 'redux-thunk';
import Container from "./Container";


describe('Container Test', () => {

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

    const initialState = {
        comment : {
        commentlist : {
            '1' : {
                loading : false,
                data : null,
                error : null
            }
        },
        comment : {
            '1' : {
                loading : false,
                data : null,
                error : null
            }
        }
    }
    };

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });

      const middleware = [ReduxThunk];
      const mockstore = configureStore(middleware);
    
      

      it('앱이 렌더링 되면 Dispatch가 성공적으로 작동하며 데이터가 올바르게 전달되었을 때, 성공적으로 Dispatch 됨', async () => {

    
        mock.onPost(`${API}/commentlist`).reply(200, data);

        const expectedActions = [ 
            'COMMENTLIST', 
            'COMMENTLIST_SUCCESS'
        ];

        const store = mockstore(initialState); //initialState = none;

        render(<Provider store={store}>
            <Container />
        </Provider>)

        await waitFor(() => expect(store.getActions().map(action => action.type)).toEqual(expectedActions));
        
      });


      it('앱이 렌더링 되면 Dispatch가 성공적으로 작동하며 데이터가 전달되지 않았을 때, 성공적으로 Dispatch 됨', async () => {


        const expectedActions = [ 
            'COMMENTLIST', 
            'COMMENTLIST_ERROR'
        ];

        const store = mockstore(initialState); //initialState = none;

        render(<Provider store={store}>
                <Container />
               </Provider>);

        await waitFor(() => expect(store.getActions().map(action => action.type)).toEqual(expectedActions));
        
      });


})