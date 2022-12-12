import Navigate from ".";
import { fireEvent, screen, render, waitFor } from "../../util/test";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ReduxThunk from 'redux-thunk';


describe('Navigate Test', () => {

    const initialState = {
        modal : {
            login : {
                data : false
            }
        }
        
    };

    const middleware = [ReduxThunk];
    const mockstore = configureStore(middleware);



    it('사이드 메뉴 버튼을 누르면 Sidebar가 나타남', async() => {

        const store = mockstore(initialState);
        
        render(
        <Provider store={store}>
            <Navigate />
        </Provider>);

        const sidebtn = screen.getByTestId("side");

        fireEvent.click(sidebtn);

        await screen.findByText("조회순"); //이벤트가 완료되기를 기다렸다가 find 수행
        await screen.findByText("별점순");
        await screen.findByText("좋아요순");
        await screen.findByText("커뮤니티");
    });

    it('로그인 버튼을 누르면 로그인 Modal이 Dispatch 됨', async() => {

        const store = mockstore(initialState);

        const expectedActions = [{ type : 'LOGIN', data : true }]; //실행되기로 예상되는 액션 정의
        
        render(
        <Provider store={store}>
            <Navigate />
        </Provider>);

        const loginbtn = screen.getByText("로그인");
        fireEvent.click(loginbtn);
        
        await waitFor(() => expect(store.getActions()).toEqual(expectedActions)); //예상되는 액션과 일치하는지 테스트
    })

})