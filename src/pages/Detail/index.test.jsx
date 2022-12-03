import { fireEvent, screen, render } from "../../util/test";
import Detail from ".";



describe('Presentational Component Test' , () => {

    const data = {
        id : 3,
        title : '검술명가 막내아들',
        writer : '황제펭귄',
        content : '진 룬칸델',
        view : 20,
        likes : 2,
        rate : 5,
        url : '/image/img1.jpg',
        link : 'www.naver.com'
      }; // props로 전달될 데이터

      const clicked = [false, false, false, false, false];

    
    it('data Props가 있다면, Product 정보가 화면에 보인다', () => {
        render(<Detail data={data} />);
        screen.getByText('검술명가 막내아들');
    });

    it('data Props가 있으며, 별점 클릭 정보가 있으면 별점 정보가 화면에 보인다', () => {
        render(<Detail data={data} clicked={clicked} />);
        screen.getByTestId('star');
    });

    it('data Props가 있으며, rateToggle이 True라면 별점 등록 모달창이 보인다.', () => {
        render(<Detail data={data} handleclicked={clicked} ratetoggle={true} />);
        screen.getByText('별점 주기');
        screen.getByTestId('star');
    });

    it('설명 더보기 버튼을 클릭하면 Text 모달창이 나타난다', () => {
        render(<Detail data={data} texttoggle={true} />);
        const btn = screen.getByText('설명 더보기');
        fireEvent.click(btn);
        const text = screen.getAllByText(data.content);
        expect(text[1]).toBeInTheDocument();
    });

    it('별점 등록 창에서 적용하기 버튼을 클릭하면 handleSubmit 함수가 호출된다..', () => {

        const handleSubmit = jest.fn();
        render(<Detail data={data} handleclicked={clicked} ratetoggle={true} handleSubmit={handleSubmit} />);
        const btn = screen.getByText('적용하기');
        fireEvent.click(btn);
        expect(handleSubmit).toBeCalledTimes(1);
        
    });





})