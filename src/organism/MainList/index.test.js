import { render, screen } from "@testing-library/react";
import MainList from ".";
import { BrowserRouter as Router } from 'react-router-dom';




describe('MainList test', () => {

     const list = [{
        id : 3,
        title : '검술명가 막내아들',
        writer : '황제펭귄',
        content : '진 룬칸델',
        view : 20,
        likes : 2,
        rate : 5,
        url : '/image/img1.jpg',
        link : 'www.naver.com'
      },
      {
        id : 4,
        title : '화산귀환',
        writer : '비가',
        content : '대 화산파 13대 제자',
        view : 55,
        likes : 4,
        rate : 5,
        url : '/image/img2.jpg',
        link : 'www.naver.com'
      }];
    

    it('Title Props test', () => {
        render(<MainList title='조회수 TOP 12'/>);
        screen.getByText(/TOP 12/);
    });

    it('List render test', () => {
        render(
        <Router>
            <MainList list={list} />
        </Router>
         );
        const testdata = screen.getByTestId('list');
        expect(testdata).toBeVisible();
        screen.getByText('검술명가 막내아들');
        screen.getByText('화산귀환');
    })

});