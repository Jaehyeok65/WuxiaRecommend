import React, { useRef } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({ styled, name, values, onChange, onClicks}) => {
    
    const searchref = useRef();

    const btnstyles = {...styled.btn };
    const inputstyles = {  ...styled.input, width : '35%'};
    

    return(
        <div style={{...styled.div}}>
            <Input name={name}
                values={values} 
                  onChange={onChange} 
                    styled={inputstyles}
                      placeholder='원하는 작품을 검색해주세요...'
                        ref={searchref}/>
            <Button onClicks={onClicks} styled={btnstyles}><FaSearch /></Button>               
        </div>
    )
    
}

export default SearchInput;