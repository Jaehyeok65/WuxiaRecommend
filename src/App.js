import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './organism/Sidebar';
import WuxiaHead from './organism/WuxiaHead';
import Modal from './molecule/Modal';
import Login from './organism/Login';
import Main from './pages/Main';
import Detail from './pages/Detail';
import List from './pages/List';
import SearchList from './pages/SearchList';
import { getSessionCheck } from './api/LoginAPI';
import Submit from './Submit';
import Community from './pages/Community';
import CommentWrite from './pages/CommentWrite';
import Comment from './pages/Comment';
import CommentUpdate from './pages/CommentUpdate';
import Navigate from './pages/Navigate';


function App() {


  
  //const [sidetoggle, setSideToggle] = useState(false); //사이드바 관련 토글
  const [logintoggle, setLoginToggle] = useState(false); //로그인 모달 관련 토글
  const [isLogin, setIsLogin] = useState(true); //로그인창인지 회원가입창인지 구분
  const [loginstate, setLoginstate] = useState(() => document.cookie.split("=")[1] || false); //false라면 login이 필요한 상태 true라면 유저 닉네임
  const [nickname, setNickname] = useState(null);

  useEffect( () => {
    getSessionCheck(() => setLoginstate(prev => !prev), setNickname); //상태 변경
  },[]); 




  return (
    <Router>
      <Navigate loginstate={loginstate} setLoginToggle={setLoginToggle} setNickname={setNickname} />
      <Modal toggle={logintoggle}>
        <Login onClose={() => setLoginToggle(prev => !prev)} isLogin={isLogin} setIsLogin = {() => setIsLogin(prev => !prev)}
         setLoginstate={() => setLoginstate(prev => !prev)} setNickname={setNickname}/>
      </Modal>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/detail/:title' element={<Detail loginstate={loginstate} setLoginToggle={() => setLoginToggle(true)} />} />
        <Route exact path='/menu/:title' element={<List />} />
        <Route exact path='/search/:title/:input' element={<SearchList />} />
        <Route exact path='/community' element={<Community loginstate={loginstate} setLoginToggle={() => setLoginToggle(true)}/>} />
        <Route exact path='/commentwrite' element={<CommentWrite loginstate={loginstate} nickname={nickname}/>} />
        <Route exact path='/comment/:id' element={<Comment loginstate={loginstate} setLoginToggle={() => setLoginToggle(true)} nickname={nickname}/>}/>
        <Route exact path='/commentupdate/:id' element={<CommentUpdate loginstate={loginstate} />} />
        <Route exact path='/save' element={<Submit />} />
      </Routes>
    </Router>
  );
}

export default App;
