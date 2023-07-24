import { render, screen, fireEvent } from '@testing-library/react';
import MyPage from './MyPage';

describe('MyPage component', () => {
    it('should render button titles', () => {
        render(<MyPage loginstate={true} />);
        const visitButton = screen.getByText('최근 본 작품');
        const likeButton = screen.getByText('좋아요 표시한 작품');
        const ratingButton = screen.getByText('별점 표시한 작품');
        expect(visitButton).toBeInTheDocument();
        expect(likeButton).toBeInTheDocument();
        expect(ratingButton).toBeInTheDocument();
    });

    it('should change title state on button click', () => {
        render(<MyPage loginstate={true} />);
        const visitButton = screen.getByText('최근 본 작품');
        const likeButton = screen.getByText('좋아요 표시한 작품');
        const ratingButton = screen.getByText('별점 표시한 작품');
        fireEvent.click(likeButton);
        expect(screen.getByText('좋아요 표시한 작품')).toHaveStyle(
            'font-weight: bold'
        );
        fireEvent.click(ratingButton);
        expect(screen.getByText('별점 표시한 작품')).toHaveStyle(
            'font-weight: bold'
        );
        fireEvent.click(visitButton);
        expect(screen.getByText('최근 본 작품')).toHaveStyle(
            'font-weight: bold'
        );
    });

    it('should render nickname props', () => {
        render(<MyPage loginstate={true} nickname={'팔협지'} />);
        const nick = screen.getByText('팔협지');
        expect(nick).toBeInTheDocument();
    });
});
