import React from 'react';
import styled from 'styled-components';

const Icons = styled.span`
    font-size: ${(props) => (props.styled ? props.styled.fontSize : '12px')};
    color: ${(props) => (props.icon ? props.styled.color : 'black')};
`;

const Icon = ({ styled, children, icon, setIcon }) => {
    return (
        <Icons styled={styled} onClick={setIcon} icon={icon}>
            {children}
        </Icons>
    );
};

export default React.memo(Icon);
