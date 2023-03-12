import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FaLine } from 'react-icons/fa';
import styled from 'styled-components';

const Footers = styled.div`
    font-size: 12px;
`;

const FlexContainer1 = styled.div`
    display: flex;
    justify-content: space-between;
    > .flexitem1,
    .flexitem2 {
        margin: 15px 4px;
        font-size: 12px;
    }

    > .flexitem1 span {
        margin-left: 2px;
    }

    > .flexitem2 span {
        margin-left: 4px;
    }
`;

const Flexcontainer2 = styled.div`
    text-align: right;
    padding: 20px;
    font-size: 12px;
    > ul {
        list-style-type: none;
    }
`;

const Footer = () => {
    return (
        <Footers>
            <hr />
            <FlexContainer1>
                <div className="flexitem1">
                    <span>
                        <FaInstagram />
                        <span>INSTAGRAM</span>
                    </span>
                    <span>
                        <FaLine />
                        <span>KAKAOTALK</span>
                    </span>
                </div>
                <div className="flexitem2">
                    <span>PRIVACY POLICY</span>
                    <span>GUIDE</span>
                    <span>AGREEMENT</span>
                    <span>MY PAGE</span>
                    <span>SIGN IN</span>
                </div>
            </FlexContainer1>
            <Flexcontainer2>
                <ul>
                    <li>
                        COMPANY: 무협지회사 &nbsp; OWNER : Hyeok Jae Lee &nbsp;
                        Copyright ©무협지코퍼레이션 All rights reserved.™{' '}
                    </li>
                    <li>
                        OFFICE: 010-1111-1112 &nbsp; BUSINESS
                        NUMBER:010-00-01000 &nbsp; MAIL-ORDER LICENSE:제
                        2020-경기도지-0000호{' '}
                    </li>
                    <li>
                        ADDRESS: 100-101, 001 Yangcheon-ro 00-gil, Doji, Seoul
                    </li>
                </ul>
            </Flexcontainer2>
        </Footers>
    );
};

export default React.memo(Footer);
