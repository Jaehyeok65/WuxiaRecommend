import { render, screen, fireEvent } from "../../util/test";
import Title from ".";



describe('Title Component Test', () => {


    it('children Props가 정상적으로 화면에 보인다.', () => {

        render(<Title>제목</Title>);

        const title = screen.getByText('제목');

        expect(title).toBeInTheDocument();

    });

    it('children Props를 클릭하면 onClick 이벤트 핸들러가 호출된다.', () => {


        const onClick = jest.fn();

        render(<Title onClicks={onClick}>제목</Title>);

        const title = screen.getByText('제목');

        expect(title).toBeInTheDocument();

        fireEvent.click(title);

        expect(onClick).toBeCalled();

    });
})