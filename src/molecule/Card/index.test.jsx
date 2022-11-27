import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from ".";



describe('Card Component Test', () => {

    const title = '검술명가 막내아들';
    const url = '/image/img1.jpg';
    const writer = '황제펭귄'; //테스트용 변수
    

    it('Title Props 확인', () => {
        render(
            <Router>
                <Card title={title} />
            </Router>
            );
        screen.getByText('검술명가 막내아들');
    })

    it('Writer Props 확인', () => {
        render(
            <Router>
                <Card writer={writer} />
            </Router>
            );
        screen.getByText('황제펭귄');
    })

    it('Url Props 확인', () => {
        render(
            <Router>
                <Card url={url} title={title} />
            </Router>
        );

        const image = screen.getByRole('img');
        image.getAttribute(url);
        
    })

    it('Alt Text 확인', () => { //alt Text를 보기 위해 엉터리 url 주입
        render(
            <Router>
                <Card url={'/missurl'} title={title} />
            </Router>
        );

        screen.getByAltText(title);
    })

    it('Link href 확인', async () => {
        render(
            <Router>
                <Card url={url} title={title} writer={writer} />
            </Router>
        );

        await fireEvent.click(screen.getByTestId('card'));
        expect(screen.getByText(title)).toBeInTheDocument();
    })

})