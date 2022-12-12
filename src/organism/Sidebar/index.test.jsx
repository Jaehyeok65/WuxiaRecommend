import { render, screen, fireEvent } from "../../util/test";
import Sidebar from ".";


describe('Sidebar Component Test', () => {

    
    it('toggle props가 true라면, Sidebar Component가 렌더링 된다.', async() => {
        
        render(<Sidebar toggle={true} />);

        const data = screen.getByText('조회순');
        expect(data).toBeInTheDocument();
    });

    it('Close 버튼을 누르면 onClicks Props가 호출된다.', async() => {

        const onClicks = jest.fn();
        render(<Sidebar toggle={true} onClicks={onClicks} />);

        const close = screen.getByTestId('close');

        fireEvent.click(close);

        expect(onClicks).toBeCalled();
    })
})