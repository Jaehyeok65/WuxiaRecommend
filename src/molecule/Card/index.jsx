import React from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/Text';
import Title from '../../atoms/Title';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const Cards = styled.div`
    border: 1px solid #fff;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    width: 99%;
    max-width: 200px;

    > div {
        text-align: center;
        color: inherit;
        text-decoration: none;
    }
    > img {
        width: 100%;
        height: ${(props) => (props.styled ? props.styled.height : '100%')};
    }
    &:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }

    @media screen and (max-width: 600px) {
        > img {
            width: 100%;
            height: ${(props) =>
                props.styled ? props.styled.mobileheight : '100%'};
        }
    }
`;

const Card = ({ url, styled, title, writer }) => {
    return (
        <StyledLink to={`/detail/${title}`}>
            <Cards styled={styled} data-testid="card">
                {url ? (
                    <img src={url} alt={title} />
                ) : (
                    <div style={{ height: '300px' }} />
                )}
                <Title styled={{ fontSize: '12px', color: 'inherit' }}>
                    {title}
                </Title>
                <Text styled={{ fontSize: '12px', color: 'gray' }}>
                    {writer}
                </Text>
            </Cards>
        </StyledLink>
    );
};

export default React.memo(Card);
