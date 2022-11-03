import axios from "axios";
import { API } from "./LoginAPI";

const sleep = n => new Promise(resolve => setTimeout(resolve, n));



  export const SubmitList = async(input) => {
   
    const data = await axios.post(`${API}/search`, {
        title : input
      });
    
    //await sleep(500); //부드러운 화면 전환을 위해 0.5초 쉬었다가 데이터 반환
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
      people : wuxia.people,
      link : wuxia.link
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
      people : wuxia.people,
      link : wuxia.link
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
      people : wuxia.people,
      link : wuxia.link
    });
    return data.data;
  }

  export const SubmitPage = async(title, page) => {

    let data;
    if(title === '조회순') {
      data = await axios.post(`${API}/pagebyview`, {
        pg : page.조회순,
        sz : 12
      });
    }
    else if(title === '별점순') {
      data = await axios.post(`${API}/pagebyrate`, {
        pg : page.별점순,
        sz : 12
      });
    }
    else if(title === '좋아요순'){
      data = await axios.post(`${API}/pagebylikes`, {
        pg : page.좋아요순,
        sz : 12
      });
    }

    await sleep(500); //부드러운 화면 전환을 위해 0.5초 쉬었다가 데이터 반환
    return data.data;
    
  }

  export const getTotal = async() => {
    const data = await axios.post(`${API}/total`, {
      pg : 1,
      sz : 12
    });
    return data.data;
  }