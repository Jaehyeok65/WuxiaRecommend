import { render, screen } from "../../util/test";
import CardInfo from ".";



describe('CardInfo Component Test', () => {

    const cardinfostyle = {
        title : {
            marginBottom : '5%',
            fontSize : '14px'
        },
        subtext : {
            marginBottom : '5%',
            fontSize : '12px',
            color : 'gray'
        },
        icon : {
            fontSize : '15px',
            color : 'red'
        },
        span : {
            fontSize : '14px',
            verticalAlign : 'top',
            marginLeft : '8px'
        },
        text : {
            fontSize : '12px',
            marginTop : '5%'
        }
    };

    const product = {
        title : '제목',
        writer : '작가',
        likes : 1,
        view : 1,
    }


    it('product Props나 styled Props가 없으면 에러 발생 텍스트가 화면에 출력된다.', () => {

        render(<CardInfo />);

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();
        
    });



    it('product Props와 styled Props가 있으면 컴포넌트가 정상적으로 화면에 출력된다.', () => {

        render(<CardInfo product={product} styled={cardinfostyle} />);

        const title = screen.getByText(product.title);

        expect(title).toBeInTheDocument();

    })
})