import { waitFor, RouterRender } from "../../util/test";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from "../../util/test";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ReduxThunk from 'redux-thunk';
import Container from "./Container";
import { StarSubmit, LikeSubmit } from '../../redux/action';



describe('Detail Container Test' , () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    const data = [{
        id : 3,
        title : '검술명가 막내아들',
        writer : '황제펭귄',
        content : '진 룬칸델',
        view : 20,
        likes : 2,
        rate : 5,
        url : '/image/img1.jpg',
        link : 'www.naver.com'
      }]; //응답에 전달될 데이터

    
    const initialState = { //초기 state 형식을 맞춤
       wuxia : {
        product: {
            '검술명가 막내아들' : {
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

    
        mock.onPost(`${API}/product`).reply(200, data);

        const expectedActions = [ 
            'PRODUCT', 
            'PRODUCT_SUCCESS'
        ];

        const store = mockstore(initialState); //initialState = none;

        RouterRender(<Provider store={store}>
            <Container />
        </Provider>, {
            path : '/detail/:title',
            initial : '/detail/검술명가 막내아들'
        });

        await waitFor(() => expect(store.getActions().map(action => action.type)).toEqual(expectedActions));
        
      });

      it('앱이 렌더링 되면 Dispatch가 성공적으로 작동하며 데이터가 전달되지 않았을 때, 성공적으로 Dispatch 됨', async () => {


        const expectedActions = [ 
            'PRODUCT', 
            'PRODUCT_ERROR'
        ];

        const store = mockstore(initialState); //initialState = none;

        RouterRender(<Provider store={store}>
            <Container />
        </Provider>, {
            path : '/detail/:title',
            initial : '/detail/검술명가 막내아들'
        });

        await waitFor(() => expect(store.getActions().map(action => action.type)).toEqual(expectedActions));
        
      });

      it('StarSubmit을 Dispatch 했을 때, 성공적으로 Dispatch가 이루어짐', async() => {

        const expectedActions = [ 
          'STAR_SUBMIT',
          'STAR_SUBMIT_SUCCESS'
      ];

        mock.onPost(`${API}/rate`).reply(200, true);

        window.alert = jest.fn();
       
        const store = mockstore(initialState); //initialState = none;

        const setRateToggle = jest.fn();

        store.dispatch(StarSubmit('최신순',5 ,data, () => setRateToggle(prev => !prev))); //콜백함수로 SetToggle 전달

        await waitFor(() => expect(store.getActions().map(action => action.type)).toEqual(expectedActions)); //

        expect(setRateToggle).toBeCalled();
        
      })

      it('LikeSubmit을 Dispatch 했을 때, 성공적으로 Dispatch가 이루어짐', async() => {

        const expectedActions = [ 
          'LIKE_SUBMIT',
          'LIKE_SUBMIT_SUCCESS'
      ];

        mock.onPost(`${API}/likes`).reply(200, true);

        window.alert = jest.fn();
       
        const store = mockstore(initialState); //initialState = none;


        store.dispatch(LikeSubmit('최신순',data));

        await waitFor(() => expect(store.getActions().map(action => action.type)).toEqual(expectedActions)); //

        
      })


})