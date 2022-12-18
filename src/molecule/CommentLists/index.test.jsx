import { render, screen } from "../../util/test";
import CommentLists from ".";



describe('CommentLists Component Test', () => {


    it('Props가 있으면 화면에 Props 내용이 출력된다.', () => {

        const writer = '작가';

        const title = '제목'

        render(<CommentLists writer={writer} title={title}/>);

        const writertest = screen.getByText(writer);

        expect(writertest).toBeInTheDocument();

        const titletest = screen.getByText(title);

        expect(titletest).toBeInTheDocument();

    });
})