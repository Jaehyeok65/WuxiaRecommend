import { RouterRender, screen, create } from "../../util/test";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from "../../util/test";
import { Provider } from "react-redux";
import SearchList from ".";

const list = [{
    id : 3,
    title : '검술명가 막내아들',
    writer : '황제펭귄',
    content : '진 룬칸델',
    view : 20,
    likes : 2,
    rate : 5,
    url : '/image/img1.jpg',
    link : 'www.naver.com'
  }];

const empty = [];

describe('List Component Test', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });
    
    const { store } = create(); //mock store는 getState를 지원하지 않기 때문에 실제 스토어로 테스트 진행


    it('Input Params에 데이터를 입력하면 해당 데이터를 전송받아 화면에 보여짐', async () => {

        mock.onPost(`${API}/search`, { title : '검술명가 막내아들'}).reply(200, list); // 가짜 응답을 전달
        

        RouterRender(<Provider store={store}>
            <SearchList />
        </Provider>, {
            path : '/search/:title/:input',
            initial : '/search/조회순/검술명가 막내아들'
        });

        await screen.findAllByText('검술명가 막내아들');
    });

    it('데이터가 없을 경우 검색 결과가 없음을 화면에 보여줌', async () => {

        mock.onPost(`${API}/search`, { title : '화산귀환'}).reply(200, empty); // 가짜 응답을 전달 == 데이터가 없을 경우이므로 빈 배열
        

        RouterRender(<Provider store={store}>
            <SearchList />
        </Provider>, {
            path : '/search/:title/:input',
            initial : '/search/조회순/화산귀환'
        });

        await screen.findAllByText(/검색 결과가 없습니다./);
    });
      

    




    
})