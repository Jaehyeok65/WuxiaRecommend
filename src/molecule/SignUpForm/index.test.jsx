import { render, screen, fireEvent, API } from "../../util/test";
import SignUpForm from ".";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const LoginFormstyle = {
    input1 : {
        margin : '15% 0px 0px 18%',
        padding : '12px',
        width : '60%'
    },
    input2 : {
        margin : '3% 0px 0px 18%',
        padding : '12px',
        width : '60%'
    },
    button : {
        margin : '3% 0px 0px 18%',
        padding : '12px',
        width : '66%',
        borderRadius : '4px',
        marginTop : '2%'
    }
};

const input = {
    userEmail : 'www@naver.com',
    userPassword : 'aaa1234',
    userNickname : '닉네임'
};


describe('SignUp Form Component Test', () => {

    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정


    afterEach(() => {
        mock.reset(); // 각 테스트 커버리지마다 정확성을 높이기 위해 mock 데이터를 리셋함
    })

    it('styled Props나 input Props가 없다면 에러 발생 텍스트가 화면에 보인다.', () => {
        
        render(<SignUpForm />);

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();

    });

    it('stlyed Props나 input Props가 있다면 컴포넌트가 정상적으로 화면에 보인다.', () => {

        const onChange = jest.fn();

        render(<SignUpForm styled={LoginFormstyle} input={input} onChange={onChange} />);

        const inputs = screen.getByPlaceholderText('이메일을 입력하세요...');

        expect(inputs).toBeInTheDocument();

        const btn = screen.getByText('회원가입');

        expect(btn).toBeInTheDocument();
    });

    it('onSubmit 호출 시 데이터가 정상적으로 전달된다.', async() => {

        const data = true;

        mock.onPost(`${API}/signup`, {
            userEmail : 'www@naver.com',
            userPassword : 'aaa1234',
            userNickname : '닉네임'
        }).reply(200, data);

        window.alert = jest.fn();

        const onChange = jest.fn();

        const onClose = jest.fn();

        const init = jest.fn();

        const setIsLogin = jest.fn();

        render(<SignUpForm styled={LoginFormstyle} input={input} onChange={onChange} onClose={onClose} init={init}
             setIsLogin={setIsLogin}
        />);

        const btn = screen.getByText('회원가입');

        expect(btn).toBeInTheDocument();

        fireEvent.click(btn);

        expect(init).toBeCalled(); //Sign Up이 실행된 후 init 함수가 실행되므로 init함수가 정상적으로 호출이 된다면 회원가입도 정상적으로 호출될 것

    });
    
});
