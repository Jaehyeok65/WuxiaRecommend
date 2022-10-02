import React, { useState } from 'react';
import styled from 'styled-components';
import HeadText from '../molecule/HeadText';
import { SearchInput } from '../molecule/SearchInput';


const Head = styled.div`
    display : flex;
    justify-content : space-between;
`



const WuxiaHead = () => {

    const [input, setInput] = useState("");

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    }


    const SearchInputstyle = { //SearchInput의 스타일 지정
        input : {
            padding : '12px',
            margin : '4px 8px'
        },
        btn : {
            padding : '12px 20px',
            margin : '4px 8px'
        }
    };

    const HeadTextstyle = {
        text : {
            fontSize : '16px',
            margin : '4px 8px',
            lineHeight : '60px'
        },
        icon : {
            fontSize : '50px',
            margin : '4px 8px'
        }
    };

    return(
        <Head>
            <HeadText styled={HeadTextstyle}/>
            <SearchInput styled={SearchInputstyle} values={input} onChange={onChange} />
        </Head>
    )

}

export default React.memo(WuxiaHead);