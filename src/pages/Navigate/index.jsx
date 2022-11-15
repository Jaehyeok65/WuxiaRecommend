import React, { useState } from 'react';
import WuxiaHead from '../../organism/WuxiaHead';
import Sidebar from '../../organism/Sidebar';
import Modal from '../../molecule/Modal';
import Login from '../../organism/Login';
import { useSelector, useDispatch } from 'react-redux';
import { LoginModal } from '../../redux/reducers/modal';


const Navigate = ( { loginstate, setLoginstate, setNickname } ) => {


    const [sidetoggle, setSideToggle] = useState(false); //사이드바 관련 토글
    const logintoggle = useSelector(state => state.modal.login.data);

    const dispatch = useDispatch();

    const ShowModal = (data) => dispatch(LoginModal(data));

    return(
        <React.Fragment>
            <WuxiaHead onClicks={() => setSideToggle(prev => !prev)} onClickss={() => ShowModal(true)}
            loginstate={!loginstate} setLoginstate={() => setLoginstate(prev => !prev)} setNickname={() => setNickname(null)}/>
            <Sidebar onClicks={() => setSideToggle(prev => !prev)} toggle={sidetoggle} />
            <Modal toggle={logintoggle}>
            <Login setLoginstate={() => setLoginstate(prev => !prev)} setNickname={setNickname} onClose={() => ShowModal(false)}/>
            </Modal>
        </React.Fragment>
    )

};


export default React.memo(Navigate);




