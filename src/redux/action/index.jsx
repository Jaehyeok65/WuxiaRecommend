import { getLists, getListByTitle } from "../../api/getList";

export const INIT = 'INIT'; //데이터 초기 정보를 받아오는 요청
export const INIT_SUCCESS = 'INIT_SUCCESS'; //데이터 받아오는데 성공
export const INIT_ERROR = 'INIT_ERROR'; //데이터 받아오는데 오류

const STAR_SUBMIT = 'STAR_SUBMIT'; //별점 적용
const STAR_SUBMIT_SUCCESS = 'STAR_SUBMIT_SUCCESS';
const STAR_SUBMIT_ERROR = 'STAR_SUBMIT_ERROR';

export const PRODUCT ='PRODUCT'
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';



const VIEW = 'VIEW'; //조회


export const init = () => async (dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : INIT}); //데이터 초기 요청 시작

    try {
        const data = await getLists();
        dispatch({ type : INIT_SUCCESS, wuxias : data });
    }
    catch(e) {
        dispatch({type : INIT_ERROR, error : e });
    }
}

export const getProduct = (title) => async (dispatch) => {

    dispatch({type : PRODUCT}); //데이터 초기 요청 시작

    try {
        const data = await getListByTitle(title);
        dispatch({ type : PRODUCT_SUCCESS, wuxia : data});
    }
    catch(e) {
        dispatch({ type : PRODUCT_ERROR, e});
    }
};


export const starsubmit = (data) => ( { type : STAR_SUBMIT, data }); //별점 정보를 data로 받아옴

export const handleView = () => ( { type : VIEW });








