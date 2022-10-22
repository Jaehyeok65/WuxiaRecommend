import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './organism/Sidebar';
import WuxiaHead from './organism/WuxiaHead';
import Modal from './molecule/Modal';
import Login from './organism/Login';
import Main from './pages/Main';
import Detail from './pages/Detail';
import List from './pages/List';


function App() {


  
  const [sidetoggle, setSideToggle] = useState(false); //사이드바 관련 토글
  const [logintoggle, setLoginToggle] = useState(false); //로그인 모달 관련 토글
  const [isLogin, setIsLogin] = useState(true); //로그인창인지 회원가입창인지 구분
  const [loginstate, setLoginstate] = useState(() => document.cookie.split("=")[1] || false); //true라면 login이 필요한 상태
  
  console.log(loginstate);
 

  
  return (
    <Router>
      <WuxiaHead onClicks={() => setSideToggle(prev => !prev)} onClickss={() => setLoginToggle(prev => !prev)}
        loginstate={!loginstate} setLoginstate={() => setLoginstate(prev => !prev)} />
      <Sidebar onClicks={() => setSideToggle(prev => !prev)} toggle={sidetoggle} />
      <Modal toggle={logintoggle} onClicks={() => setLoginToggle(prev => !prev)}>
        <Login onClose={() => setLoginToggle(prev => !prev)} isLogin={isLogin} setIsLogin = {() => setIsLogin(prev => !prev)} setLoginstate={() => setLoginstate(prev => !prev)} />
      </Modal>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/detail/:title' element={<Detail />} />
        <Route exact path='/menu/:title' element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
