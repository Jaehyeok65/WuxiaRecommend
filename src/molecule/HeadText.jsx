import React from 'react';
import styled from 'styled-components';
import Icon from '../atoms/Icon';
import { Text } from '../atoms/Text';

const HeadTexts = styled.div`
    display : flex;
`;



const HeadText = ( { styled }) => {


    const Iconstyle = {...styled.icon};
    const Textstyle = {...styled.text};

    return(
        <HeadTexts>
            <Icon styled={Iconstyle}/>
            <Text styled={Textstyle}>무협광</Text>
        </HeadTexts>
    )
}

export default HeadText;