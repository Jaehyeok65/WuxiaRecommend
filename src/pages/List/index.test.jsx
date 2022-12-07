import { waitFor, RouterRender, screen, create, fireEvent } from "../../util/test";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from "../../util/test";
import { Provider } from "react-redux";
import List from ".";

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
  },{
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
  },{
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
  }
];

const list2 = [{
  id : 13,
  title : '인건비',
  writer : '비가',
  content : '대 화산파 13대 제자',
  view : 55,
  likes : 4,
  rate : 5,
  url : '/image/img2.jpg',
  link : 'www.naver.com'
},
{
  id : 14,
  title : '안녕귀환',
  writer : '비가',
  content : '대 화산파 13대 제자',
  view : 55,
  likes : 4,
  rate : 5,
  url : '/image/img2.jpg',
  link : 'www.naver.com'
},
{
  id : 15,
  title : '비뢰도',
  writer : '비가',
  content : '대 화산파 13대 제자',
  view : 55,
  likes : 4,
  rate : 5,
  url : '/image/img2.jpg',
  link : 'www.naver.com'
}];

const mockIntersectionObserver = class {
    constructor(callback, options) {
        this.viewPort = options.root
        this.entries = [];
        if(this.viewPort) {
        this.viewPort.addEventListener('scroll', () => {
            this.entries.map((entry) => (
                entry.isIntersecting = this.isInViewPort(entry.target)
            ))
            callback(this.entries, this)
        })
      }
        
    }

    isInViewPort(target) {
        // const rect = target.getBoundingClientRect()
        // const viewPortRect = this.viewPort.getBoundingClientRect()
        // return (
        //     rect.left >= viewPortRect.x &&
        //     rect.top >= viewPortRect.y &&
        //     rect.right <= viewPortRect.right &&
        //     rect.bottom <= viewPortRect.bottom
        // )
        return true
    }

    observe(target) {
        this.entries.push({ isIntersecting: false, target })
    }

    unobserve(target) {
        this.entries = this.entries.filter((ob) => ob.target !== target)
    }

    disconnect() {
        this.entries = []
    }
};

window.IntersectionObserver = mockIntersectionObserver;



describe('List Component Test', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    

    afterEach(() => {
        mock.reset(); //테스트 케이스를 수행 후 mock 데이터를 초기화함
    });
      const { store } = create(); //mock store는 getState를 지원하지 않기 때문에 실제 스토어로 테스트 진행
      

    it('초반에 렌더링이 되면 Dispatch가 정상적으로 실행이 됨', async () => {

        mock.onPost(`${API}/pagebyview`, { pg : 1, sz : 12}).reply(200, list); //리스트에 관한 가짜 응답
        mock.onPost(`${API}/total`).reply(200,13); //토탈에 관한 가짜 응답
        

        RouterRender(<Provider store={store}>
            <List />
        </Provider>, {
            path : '/menu/:title',
            initial : '/menu/조회순'
        });

        await screen.findAllByText('검술명가 막내아들');

        const { data } = store.getState().wuxia.list.조회순; 
        
        expect(data).toHaveLength(10); //가짜 데이터에서 10개의 데이터를 넘겼으므로 data에 10개의 데이터가 있을 것으로 예상

    });


    it('스크롤을 하면 page가 바뀌며 다음 데이터 요청을 함', async () => {
        mock.onPost(`${API}/pagebyview`, { pg : 1, sz : 12}).reply(200, list); //리스트에 관한 가짜 응답
        mock.onPost(`${API}/pagebyview`, { pg : 2, sz : 12}).reply(200, list2); //리스트2에 관한 가짜 응답
        mock.onPost(`${API}/total`).reply(200,13); //토탈에 관한 가짜 응답

        RouterRender(<Provider store={store}>
          <List />
        </Provider>, {
          path : '/menu/:title',
          initial : '/menu/조회순'
        });

        fireEvent.scroll(document.querySelector('#viewPort'), { target : { scrollY : 1000 }});

        await screen.findAllByText('비뢰도');

        const { data } = store.getState().wuxia.list.조회순; 

        await waitFor(() => expect(data).toHaveLength(13));


    })


    
})