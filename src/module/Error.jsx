import React from 'react';
import styled from 'styled-components';

const ErrorComponent = styled.div`
    display: flex;
    justify-content: center;
`;

const Error = ({ error }) => {
    return (
        <ErrorComponent>
            {error.message} 잠시 후 다시 시도해주세요!
        </ErrorComponent>
    );
};

export default React.memo(Error);
