import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { FaSearch } from 'react-icons/fa';

export const SearchInput = ({ styled, name, values, onChange, onSubmit }) => {

    const [toggle, setToggle] = useState(true); //toggle을 내부에 담을 것인가? 외부에 위임할 것인가 자체 기능이므로 컴포넌트 내부에 내장
    //SearchInput 분자 고유 기능이므로 state로 toggle 내장
  
    const btnstyles = {...styled.btn };
    const inputstyles = {  ...styled.input, width : '35%'};
    

    return(
        <React.Fragment>
            { toggle ? //버튼이 눌리면 Input바가 나타나게함
                <Button onClicks={() => setToggle(prev => !prev)} styled={btnstyles}><FaSearch /></Button> 
                : 
                <Input name={name} values={values} onChange={onChange} styled={inputstyles} placeholder='원하는 작품을 검색해주세요...' />
            }
        </React.Fragment>
    )
    
}