import React from 'react';
import styled from 'styled-components';
import Icon from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { FaBars } from 'react-icons/fa';
import Button from '../../atoms/Button';
import { AiOutlineMedium } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const HeadTexts = styled.div`
    display: flex;
    width: ${(props) => props.styled.head.pcwidth};
    justify-content: space-between;

    @media screen and (max-width: 1000px) {
        width: ${(props) => props.styled.head.mobilewidth};
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

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

const HeadText = ({ styled, onClicks }) => {
    const Iconstyle = { ...styled.icon };
    const Textstyle = { ...styled.text };
    const btnstyle = { ...styled.btn };

    return (
        <HeadTexts styled={styled}>
            <Button onClicks={onClicks} styled={btnstyle}>
                <Icon styled={{ fontSize: '30px' }}>
                    <FaBars data-testid="side" />
                </Icon>
            </Button>
            <Container>
                <StyledLink to="/">
                    <Icon styled={Iconstyle}>
                        <AiOutlineMedium />
                    </Icon>
                </StyledLink>
                <Text styled={Textstyle}>무협지</Text>
            </Container>
        </HeadTexts>
    );
};

export default React.memo(HeadText);
