import React, { useEffect, useState, useRef } from 'react';
import { Input } from '../atoms/Input';
import { FaSearch } from 'react-icons/fa';
import Icon from '../atoms/Icon';
import styled from 'styled-components';


const Form = styled.form`
    width : ${props => props.styled.div.pcwidth};
    text-align : ${props => props.styled.div.textAlign};
    

    > span {
        display : inline-block;
        margin-top : 20px;
    }

    @media screen and (max-width : 1000px) {
        width : ${props => props.styled.div.mobilewidth};
    }
`;


const SearchInput = ({ styled, name, values, onChange }) => {
    
    
    const [toggle, setToggle] = useState(true);
    const inputstyles = {  ...styled.input, width : '50%'};

    const searchref = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onBtnSearch = () => {
        setToggle(prev => !prev);
    };

    useEffect(() => {
        function handleClickOutside(e) {
            console.log(searchref.current);
          if (
            searchref.current &&
            !searchref.current.contains(e.target)
          ) {
            setToggle(true); 
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [searchref]);

      console.log(toggle);

   

    return(
        <Form onSubmit={onSubmit} styled={styled}>
            { toggle ? 
                <Icon styled={{fontSize : '20px'}} setIcon={onBtnSearch}>
                    <FaSearch />
                </Icon>
             :
            <Input values={values} name={name} onChange={onChange} ref={searchref} styled={inputstyles}/>
            }
        </Form>
    )
    
}

export default SearchInput;