import React, { useState, useEffect } from 'react';
import MainFrame from '../MainFrame';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPage } from '../../redux/action';
import ListView from '../../module/ListView';
import Button from '../../atoms/Button';
import styled from 'styled-components';
import Error from '../../module/Error';
import Loading from '../../module/Loading';

const Btngrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 20px;
    margin-top: 2%;
`;

const None = styled.div`
    text-align: center;
    font-size: 20px;
    color: gray;
    margin-top: 2%;
`;

const cardstyle = {
    height: '100%',
    mobileheight: '100%',
};

const cardinfostyle = {
    title: {
        marginBottom: '5%',
        fontSize: '14px',
    },
    subtext: {
        marginBottom: '5%',
        fontSize: '12px',
        color: 'gray',
    },
    icon: {
        fontSize: '15px',
        color: 'red',
    },
    span: {
        fontSize: '14px',
        verticalAlign: 'top',
        marginLeft: '8px',
    },
    text: {
        fontSize: '12px',
        marginTop: '5%',
    },
};

const MyPage = ({ loginstate }) => {
    const [title, setTitle] = useState('방문'); //default는 최근 방문한 작품

    const { data, loading, error } = useSelector(
        (state) => state.wuxia.mypage[title]
    ) || {
        loading: false,
        data: null,
        error: null,
    };

    const dispatch = useDispatch();

    useEffect(() => {
        //메뉴 전용
        dispatch(getMyPage(title));
    }, [dispatch, title]);

    if (
        loading &&
        performance.timing.loadEventEnd - performance.timing.navigationStart >
            3000
    )
        return <Loading width="5%" height="5%" marginTop="5%" />;
    if (error) return <Error error={error} />;

    return (
        <React.Fragment>
            {loginstate ? (
                <MainFrame>
                    <Btngrid title={title}>
                        <Button
                            styled={{
                                border: 'none',
                                fontWeight: title === '방문' && 'bold',
                                fontSize: title === '방문' && '15px',
                            }}
                            onClick={() => setTitle('방문')}
                        >
                            최근 방문한 작품
                        </Button>
                        <Button
                            styled={{
                                border: 'none',
                                fontWeight: title === '좋아요' && 'bold',
                                fontSize: title === '좋아요' && '15px',
                            }}
                            onClick={() => setTitle('좋아요')}
                            fontWeight={title === '좋아요순' ? true : false}
                        >
                            좋아요 표시한 작품
                        </Button>
                        <Button
                            styled={{
                                border: 'none',
                                fontWeight: title === '별점' && 'bold',
                                fontSize: title === '별점' && '15px',
                            }}
                            onClick={() => setTitle('별점')}
                        >
                            별점 표시한 작품
                        </Button>
                    </Btngrid>
                    {data === null && title === '방문' && (
                        <None>아직 방문한 작품이 없습니다.</None>
                    )}
                    {data && data.length === 0 && title === '좋아요' && (
                        <None>아직 좋아요를 표시한 작품이 없습니다.</None>
                    )}
                    {data && data.length === 0 && title === '별점' && (
                        <None>아직 별점을 표시한 작품이 없습니다.</None>
                    )}
                    {data && (
                        <ListView
                            data={data}
                            cardstyle={cardstyle}
                            cardinfostyle={cardinfostyle}
                        />
                    )}
                </MainFrame>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </React.Fragment>
    );
};

export default React.memo(MyPage);
