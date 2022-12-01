import { fireEvent, screen, RouterRender, render } from "../../util/test";
import Community from ".";




describe('Presentational Component Test', () => {

    const data = [{
        id : 2,
        title : '제목이 뭐니',
        content : '내용이 뭐니',
        writer : '호돌맨',
        date : '2022-10-27',
        view : 0,
        recommend : 0
      }];

    it('데이터가 있으며 현재 페이지 정보가 있으면 리스트가 성공적으로 보인다', () => {
        render(<Community data={data} offset={0} limit={10} /> );
        screen.getByText(data[0].title);
    });

    it('로그인 정보가 없는데 글쓰기 버튼을 누르면 login창이 나타난다.', async() => {
        const isLoginToggle = jest.fn();
        render(<Community data={data} offset={0} limit={10} isLoginToggle={isLoginToggle} /> );
        const Icon = screen.getByTestId('write');
        fireEvent.click(Icon);
        expect(isLoginToggle).toBeCalled();
    });

    it('page 정보가 있으면 pagenation 컴포넌트가 보인다.', async() => {
        render(<Community data={data} offset={0} limit={10} page={1} />);
        screen.getByText('<');
        screen.getByText('1');
        screen.getByText('>');
    });

    it('SelectList props가 있으면 selectList가 보이며, select를 변경하면 selected가 변경된다.', () => {
        const handleSelect = jest.fn();
        const selectList = ["최신순", "추천순"];
        const Selected = '최신순';
        render(<Community data={data} offset={0} limit={10} page={1} handleSelect={handleSelect} selectList={selectList} Selected={Selected} /> ); 
        const selection = screen.getByDisplayValue(Selected);
        fireEvent.change(selection, { target : { value : '추천순' }});
        expect(handleSelect).toBeCalled();
    });

    


})
