import React, { useState } from 'react';
import Header from '../../organism/Header';
import Sidebar from '../../organism/Sidebar';
import Modal from '../../molecule/Modal';
import Login from '../../organism/Login';
import { useSelector, useDispatch } from 'react-redux';
import { LoginModal } from '../../redux/reducers/modal';
import { SignUpModal } from '../../redux/reducers/modal';
import SignUp from '../../organism/SignUp';

const Navigate = ({ loginstate, setLoginstate, setNickname }) => {
    const [sidetoggle, setSideToggle] = useState(false); //사이드바 관련 토글

    const logintoggle = useSelector((state) => state.modal.login.data);

    const signuptoggle = useSelector((state) => state.modal.signup.data);

    const dispatch = useDispatch();

    const ShowLoginModal = (data) => dispatch(LoginModal(data));

    const ShowSignUpModal = (data) => dispatch(SignUpModal(data));

    return (
        <React.Fragment>
            <Header
                onClicks={() => setSideToggle((prev) => !prev)}
                onClickLoginModal={() => ShowLoginModal(true)}
                loginstate={!loginstate}
                setLoginstate={() => setLoginstate((prev) => !prev)}
                setNickname={() => setNickname(null)}
                onClickSignUpModal={() => ShowSignUpModal(true)}
            />
            <Sidebar
                onClicks={() => setSideToggle((prev) => !prev)}
                toggle={sidetoggle}
            />
            <Modal toggle={logintoggle}>
                <Login
                    setLoginstate={() => setLoginstate((prev) => !prev)}
                    setNickname={setNickname}
                    onClose={() => ShowLoginModal(false)}
                />
            </Modal>
            <Modal toggle={signuptoggle}>
                <SignUp
                    setNickname={setNickname}
                    onClose={() => ShowSignUpModal(false)}
                />
            </Modal>
        </React.Fragment>
    );
};

export default React.memo(Navigate);
