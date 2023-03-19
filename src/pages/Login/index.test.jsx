import { render, screen, fireEvent } from "../../util/test";
import Login from ".";


describe('Login Component Test', () => {


    it('초기에 Login Title이 보이며, 클릭하면 Sign Up으로 바뀐다.', async() => {

        render(<Login />);

        const logintitle = screen.getByText('Login');
        expect(logintitle).toBeInTheDocument();

        fireEvent.click(logintitle);
        
        const signuptitle = await screen.findByText('Sign Up');
        expect(signuptitle).toBeInTheDocument();
    });

    it('초기에는 LoginForm Component로 렌더링 되며, isLogin State가 바뀌면 Sign Up Component로 렌더링이 된다.', async() => {

        render(<Login />);

        expect(screen.getByText('로그인')).toBeInTheDocument();

        const logintitle = screen.getByText('Login');

        fireEvent.click(logintitle); //logintitle을 클릭하면 isLogin state가 바뀜.

        const signup = await screen.findByText('회원가입');
        
        expect(signup).toBeInTheDocument();

        
    });
})