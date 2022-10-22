import axios from "axios";
import { API } from "./LoginAPI";

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

const list = [{
  url : '/image/img1.jpg',
  title : '검술명가 막내아들',
  subtitle : '황제펭귄',
  content : '회귀한 진 룬칸델의 일대기',
  view : 0,
  like : 1,
  rate : 5
  
},
{
  url : '/image/img2.jpg',
  title : '화산귀환',
  subtitle : '비가',
  content : '회귀환 청명의 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img3.png',
  title : '화산전생',
  subtitle : '정준',
  content : '회귀한 주서천의 일대기',
  view : 0,
  like : 1,
  rate : 3

},
{
  url : '/image/img4.jpg',
  title : '화산권마',
  subtitle : '우각',
  content : '담호의 마교 박살기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img5.jpg',
  title : '월령검제',
  subtitle : 'be인기작가',
  content : '월령검제가 되기 위한 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img6.jpg',
  title : '사신표월',
  subtitle : '우각',
  content : '버려진 사신의 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img7.jpg',
  title : '구천구검',
  subtitle : '조진행',
  content : '개씹망작의 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img8.jpg',
  title : '무당기협',
  subtitle : '은열',
  content : '회귀한 진무의 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img9.jpg',
  title : '종횡구주',
  subtitle : '월인',
  content : '시공간을 초월한 사기캐의 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img10.jpg',
  title : '북검전기',
  subtitle : '해민, 우각',
  content : '동료로 부터 배신당한 사람의 일대기',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img11.png',
  title : '창천무신',
  subtitle : '담호',
  content : '이건 잘 모르겠다',
  view : 0,
  like : 1,
  rate : 3
},
{
  url : '/image/img12.jpg',
  title : '풍운객잔',
  subtitle : '주비',
  content : '객잔을 만든 사기캐의 일대기',
  view : 0,
  like : 1,
  rate : 3
}]

const lists = {
  '조회순' : list,
  '별점순' : list,
  '좋아요순' : list
};




  export const getLists = async (title) => { //title 파라미터에 따라 리턴하도록 구조 바꿈
    await sleep(500); // 0.5초 쉬고
    return lists[title]; // posts 배열
  };

  export const getListss = async () => { //title 파라미터에 따라 리턴하도록 구조 바꿈
    await sleep(500); // 0.5초 쉬고
    return list; // posts 배열
  };
  
  // ID로 포스트를 조회하는 비동기 함수
  export const getListByTitle = async title => {
    await sleep(500); // 0.5초 쉬고
    return list.find(item => item.title === title); // id 로 찾아서 반환
  };

  export const SubmitList = async() => {
    const data = await axios.get(`${API}/list`);
    return data.data;
  }

  export const SubmitProduct = async(title) => {
    const data = await axios.post(`${API}/product`, {
      title : title
    });
    return data.data;
  }