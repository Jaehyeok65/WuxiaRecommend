import { getLists, getListByTitle } from "../../api/getList";

export const INIT = 'INIT'; //데이터 초기 정보를 받아오는 요청
export const INIT_SUCCESS = 'INIT_SUCCESS'; //데이터 받아오는데 성공
export const INIT_ERROR = 'INIT_ERROR'; //데이터 받아오는데 오류

export const STAR_SUBMIT = 'STAR_SUBMIT'; //별점 적용
export const STAR_SUBMIT_SUCCESS = 'STAR_SUBMIT_SUCCESS';
export const STAR_SUBMIT_ERROR = 'STAR_SUBMIT_ERROR';

export const PRODUCT ='PRODUCT' //item 하나 가져옴
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';



const VIEW = 'VIEW'; //조회


export const init = (title) => async (dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : INIT}); //데이터 초기 요청 시작


    try {
        const data = await getLists(title); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        dispatch({ type : INIT_SUCCESS, data : data, title : title });
    }
    catch(e) {
        dispatch({type : INIT_ERROR, error : e, title : title });
    }
}

export const getProduct = (title) => async (dispatch) => {

    dispatch({type : PRODUCT}); //데이터 초기 요청 시작

    try {
        const data = await getListByTitle(title);
        dispatch({ type : PRODUCT_SUCCESS, data : data});
    }
    catch(e) {
        dispatch({ type : PRODUCT_ERROR, error : e});
    }
};


export const StarSubmit = (title, star) => async (dispatch) => {
    dispatch({ type : STAR_SUBMIT }); //데이터 초기 요청 시작
    
    try {
        const data = await getListByTitle(title);
        const newdata = {...data, rate : star};
        dispatch({ type : STAR_SUBMIT_SUCCESS, data : newdata });
    }
    catch(e) {
        dispatch({ type : STAR_SUBMIT_ERROR, error : e });
    }

}

export const handleView = () => ( { type : VIEW });








