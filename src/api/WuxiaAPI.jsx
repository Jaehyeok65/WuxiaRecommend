import axios from "axios";
import { API } from "./LoginAPI";

const sleep = n => new Promise(resolve => setTimeout(resolve, n));



  export const SubmitList = async(title, input) => {
    let data;
    if(title === '조회순') {
      data = await axios.get(`${API}/listbyview`);
    }
    else if(title === '별점순') {
      data = await axios.get(`${API}/listbyrate`);
    }
    else if(title === '좋아요순'){
      data = await axios.get(`${API}/listbylikes`);
    }
    else {
      data = await axios.post(`${API}/search`, {
        title : input
      });
    }
    await sleep(500); //부드러운 화면 전환을 위해 0.5초 쉬었다가 데이터 반환
    return data.data;
  }

  export const SubmitRate = async(wuxia) => {

    const data = await axios.post(`${API}/rate`, {
      id : wuxia.id,
      title : wuxia.title,
      writer : wuxia.writer,
      url : wuxia.url,
      content : wuxia.content,
      likes : wuxia.likes,
      view : wuxia.view,
      rate : wuxia.rate,
      people : wuxia.people
    });
    return data.data;
  }

  export const SubmitProduct = async(title) => {
    const data = await axios.post(`${API}/product`, {
      title : title
    });
    return data.data;
  }

  export const SubmitMain = async() => {
    const data = await axios.get(`${API}/main`);
    return data.data;
  }

  export const SubmitView = async(wuxia) => { //조회수 1 증가
    await axios.post(`${API}/view`, {
      id : wuxia.id,
      title : wuxia.title,
      writer : wuxia.writer,
      url : wuxia.url,
      content : wuxia.content,
      likes : wuxia.likes,
      view : wuxia.view + 1,
      rate : wuxia.rate,
      people : wuxia.people
    });
  }

  export const SubmitLike = async(wuxia) => { //조회수 1 증가
    const data = await axios.post(`${API}/likes`, {
      id : wuxia.id,
      title : wuxia.title,
      writer : wuxia.writer,
      url : wuxia.url,
      content : wuxia.content,
      likes : wuxia.likes,
      view : wuxia.view,
      rate : wuxia.rate,
      people : wuxia.people
    });
    return data.data;
  }