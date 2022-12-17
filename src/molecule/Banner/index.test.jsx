import { render, screen } from "../../util/test";
import Banner from ".";



describe('Banner Component Test', () => {


    it('Product Props가 없다면, 에러 발생 텍스트가 화면에 보인다.', () => {


        render(<Banner />);

        const error = screen.getByText('에러 발생');

        expect(error).toBeInTheDocument();

    });

    it('Product Props가 있다면, Banner 컴포넌트가 정상적으로 화면에 보인다.', () => {

        const product = {
            title : '제목',
            url : 'www.naver.com'
        };

        render(<Banner product={product} />);

        const alt = screen.getByAltText(product.title);

        expect(alt).toBeInTheDocument();
    })
})