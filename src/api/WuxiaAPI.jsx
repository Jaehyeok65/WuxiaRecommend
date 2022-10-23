import axios from "axios";
import { API } from "./LoginAPI";

const sleep = n => new Promise(resolve => setTimeout(resolve, n));



  export const SubmitList = async() => {
    const data = await axios.get(`${API}/list`);
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