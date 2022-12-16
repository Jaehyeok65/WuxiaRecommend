import { render, screen, fireEvent } from "../../util/test";
import HeadText from ".";


describe('HeadText Component Test', () => {

    const HeadTextstyle = {
        text : {
            fontSize : '16px',
        },
        icon : {
            fontSize : '50px',
            margin : '4px 8px'
        },
        btn : {
            border : 'none',
            padding : '12px 20px',
        },
        head : {
            pcwidth : '60%',
            mobilewidth : '70%'
        }
    
    };


    it('초기 렌더링이 정상적으로 이루어진다.', () => {

        render(<HeadText styled={HeadTextstyle}/>);

        screen.getByText('무협지');
    });
    

    it('버튼을 클릭하면 onClick 이벤트 핸들러가 정상적으로 동작한다.', () => {

        const onClicks = jest.fn();

        render(<HeadText styled={HeadTextstyle} onClicks={onClicks}/>);

        const btn = screen.getByTestId("side");

        fireEvent.click(btn);

        expect(onClicks).toBeCalled();
    });
})