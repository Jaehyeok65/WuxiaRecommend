import { render, screen } from "../../util/test";
import Modal from ".";


describe('Modal Component Test', () => {


    it('toggle Props가 True라면 chilrdren 내용이 보인다.', () => {

        render(<Modal toggle={true}>내용</Modal>);

        const content = screen.getByText('내용');

        expect(content).toBeInTheDocument();
    });

});