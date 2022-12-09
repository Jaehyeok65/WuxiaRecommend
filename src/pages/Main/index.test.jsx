import { RouterRender, screen, create } from "../../util/test";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from "../../util/test";
import { Provider } from "react-redux";
import Main from ".";

const list = [[{
    id : 3,
    title : '검술명가 막내아들',
    writer : '황제펭귄',
    content : '진 룬칸델',
    view : 20,
    likes : 2,
    rate : 5,
    url : '/image/img1.jpg',
    link : 'www.naver.com'
  },
  {
    id : 4,
    title : '화산귀환',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  },{
    id : 5,
    title : '화산전생',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  },{
    id : 6,
    title : '전승자',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  }],[{
    id : 7,
    title : '능천신제',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  },{
    id : 8,
    title : '능천귀환',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  },{
    id : 9,
    title : '신제귀환',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  },{
    id : 10,
    title : '아빠가 너무 강함',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  }],[{
    id : 11,
    title : '아빠귀환',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  },{
    id : 12,
    title : '선생님귀환',
    writer : '비가',
    content : '대 화산파 13대 제자',
    view : 55,
    likes : 4,
    rate : 5,
    url : '/image/img2.jpg',
    link : 'www.naver.com'
  }]
];

describe('List Component Test', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });
    
    const { store } = create(); //mock store는 getState를 지원하지 않기 때문에 실제 스토어로 테스트 진행


    it('초반에 렌더링이 되고, 응답이 없으면 화면에 에러 발생 문구가 보여짐', async () => {

        //mock.onGet(`${API}/main`).reply(200, list); // 가짜 응답을 주석처리 하여 서버가 닫힌 상황
        

        RouterRender(<Provider store={store}>
            <Main />
        </Provider>, {
            path : '/',
            initial : '/'
        });

        await screen.findAllByText('에러 발생!');

    });
      

    it('초반에 렌더링이 되면 Dispatch가 정상적으로 실행이 되며 Title이 제대로 화면에 보여짐', async () => {

        mock.onGet(`${API}/main`).reply(200, list); //리스트에 관한 가짜 응답
        

        RouterRender(<Provider store={store}>
            <Main />
        </Provider>, {
            path : '/',
            initial : '/'
        });

        await screen.findAllByText('조회수 TOP 12');
        await screen.findAllByText('좋아요 TOP 12');
        await screen.findAllByText('별점 TOP 12');

    });

    it('초반에 렌더링이 되면 Dispatch가 정상적으로 실행이 되며 리스트가 화면에 제대로 보여짐', async () => {

        mock.onGet(`${API}/main`).reply(200, list); //리스트에 관한 가짜 응답
        

        RouterRender(<Provider store={store}>
            <Main />
        </Provider>, {
            path : '/',
            initial : '/'
        });

        await screen.findAllByText('검술명가 막내아들');
        await screen.findAllByText('능천신제');
        await screen.findAllByText('선생님귀환');

    });

    




    
})