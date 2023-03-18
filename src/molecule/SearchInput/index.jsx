import React, { useEffect, useState, useRef } from 'react';
import { Input } from '../../atoms/Input';
import { FaSearch } from 'react-icons/fa';
import Icon from '../../atoms/Icon';
import styled from 'styled-components';

const Form = styled.form`
    width: ${(props) => props.styled.div.pcwidth};
    text-align: ${(props) => props.styled.div.textAlign};

    > span {
        display: inline-block;
        margin-top: 20px;
    }

    @media screen and (max-width: 1000px) {
        width: ${(props) => props.styled.div.mobilewidth};
    }
`;

const SearchInput = ({ styled, name, values, onChange, onClear }) => {
    const [toggle, setToggle] = useState(true);
    const inputstyles = { ...styled.input, width: '50%' };

    const searchref = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        setToggle((prev) => !prev);
        onClear();
    };

    const onBtnSearch = () => {
        setToggle((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchref.current && !searchref.current.contains(e.target)) {
                setToggle(true);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchref]);

    return (
        <Form onSubmit={onSubmit} styled={styled}>
            {toggle ? (
                <Icon styled={{ fontSize: '20px' }} setIcon={onBtnSearch}>
                    <FaSearch data-testid="searchinput" />
                </Icon>
            ) : (
                <Input
                    value={values}
                    name={name}
                    onChange={onChange}
                    ref={searchref}
                    styled={inputstyles}
                    auto="off"
                />
            )}
        </Form>
    );
};

export default React.memo(SearchInput);
