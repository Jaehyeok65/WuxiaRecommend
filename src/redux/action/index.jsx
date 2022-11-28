import { SubmitLike, SubmitList, SubmitProduct, SubmitRate, SubmitMain, SubmitPage } from "../../api/WuxiaAPI";
import { CommentList, CommentSubmit, Comment, CommentRecommend, CommentUpdate, CommentDelete } from "../../api/CommentAPI";

export const MAIN = 'MAIN'; //데이터 초기 정보를 받아오는 요청
export const MAIN_SUCCESS = 'MAIN_SUCCESS'; //데이터 받아오는데 성공
export const MAIN_ERROR = 'MAIN_ERROR'; //데이터 받아오는데 오류

export const LIST = 'LIST'; //데이터 초기 정보를 받아오는 요청
export const LIST_SUCCESS = 'LIST_SUCCESS'; //데이터 받아오는데 성공
export const LIST_ERROR = 'LIST_ERROR'; //데이터 받아오는데 오류

export const SEARCH = 'SEARCH'; //데이터 초기 정보를 받아오는 요청
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'; //데이터 받아오는데 성공
export const SEARCH_ERROR = 'SEARCH_ERROR'; //데이터 받아오는데 오류

export const STAR_SUBMIT = 'STAR_SUBMIT'; //별점 적용
export const STAR_SUBMIT_SUCCESS = 'STAR_SUBMIT_SUCCESS';
export const STAR_SUBMIT_ERROR = 'STAR_SUBMIT_ERROR';

export const PRODUCT ='PRODUCT' //item 하나 가져옴
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
export const PRODUCT_ERROR = 'PRODUCT_ERROR';

export const LIKE_SUBMIT = 'LIKE_SUBMIT'; //좋아요 적용
export const LIKE_SUBMIT_SUCCESS = 'LIKE_SUBMIT_SUCCESS';
export const LIKE_SUBMIT_ERROR = 'LIKE_SUBMIT_ERROR';

export const COMMENT = 'COMMENT'; //데이터 초기 정보를 받아오는 요청
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS'; //데이터 받아오는데 성공
export const COMMENT_ERROR = 'COMMENT_ERROR'; //데이터 받아오는데 오류

export const COMMENTLIST = 'COMMENTLIST'; //데이터 초기 정보를 받아오는 요청
export const COMMENTLIST_SUCCESS = 'COMMENTLIST_SUCCESS'; //데이터 받아오는데 성공
export const COMMENTLIST_ERROR = 'COMMENTLIST_ERROR'; //데이터 받아오는데 오류

export const COMMENTRECOMMEND = 'COMMENTRECOMMEND'; //데이터 초기 정보를 받아오는 요청
export const COMMENTRECOMMEND_SUCCESS = 'COMMENTRECOMMEND_SUCCESS'; //데이터 받아오는데 성공
export const COMMENTRECOMMEND_ERROR = 'COMMENTRECOMMEND_ERROR'; //데이터 받아오는데 오류


export const getMain = () => async (dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : MAIN}); //데이터 초기 요청 시작


    try {
        const data = await SubmitMain(); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        dispatch({ type : MAIN_SUCCESS, data });
    }
    catch(e) {
        dispatch({type : MAIN_ERROR, error : e });
    }
}

export const getList = (title, input) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : LIST, title }); //데이터 초기 요청 시작


    try {
        const data = await SubmitList(title, input); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        dispatch({ type : LIST_SUCCESS, data , title });
    }
    catch(e) {
        dispatch({type : LIST_ERROR, error : e });
    }
}

export const getSearch = (title, input) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : SEARCH, title }); //데이터 초기 요청 시작


    try {
        const data = await SubmitList(input); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        dispatch({ type : SEARCH_SUCCESS, data , title  });
    }
    catch(e) {
        dispatch({type : SEARCH_ERROR, error : e });
    }
}

export const getProduct = (title) => async (dispatch) => {

    dispatch({type : PRODUCT, title }); //데이터 초기 요청 시작

    try {
        const data = await SubmitProduct(title);
        dispatch({ type : PRODUCT_SUCCESS, data , title });
    }
    catch(e) {
        dispatch({ type : PRODUCT_ERROR, error : e, title });
    }
};


export const StarSubmit = (title, rate, data, setRateToggle) => async (dispatch) => {
    dispatch({ type : STAR_SUBMIT, title }); //데이터 초기 요청 시작
    
    try {
        const people = (Number)(data.people+1);
        const newdata = {...data, rate : rate, people : people};
        const datas = await SubmitRate(newdata);
        if(datas) { //false라면 이미 별점을 등록한 것
            window.alert("별점 등록에 성공하셨습니다");
            setRateToggle();
        }
        else {
            window.alert("이미 별점을 등록하셨습니다.");
            setRateToggle();
            return;
        }
        dispatch({ type : STAR_SUBMIT_SUCCESS, data : newdata, title });
    }
    catch(e) {
        dispatch({ type : STAR_SUBMIT_ERROR, error : e, title });
    };
};

export const LikeSubmit = (title, data) => async (dispatch) => {
    dispatch({ type : LIKE_SUBMIT, title }); //데이터 초기 요청 시작
    
    try {
        const datas = await SubmitLike(data);
        let result;
        if(datas) { //true라면 좋아요 등록에 성공하였으므로
            window.alert("좋아요 등록에 성공하셨습니다");
            result = {...data, likes : data.likes + 1}; //웹에 표시될 좋아요를 1증가 시켜준 후 dispatch로 적용
        }
        else { //false라면 좋아요 등록에 실패한것이므로
            window.alert("좋아요 취소에 성공하셨습니다.");
            result = {...data, likes : data.likes - 1};
        }
        dispatch({ type : LIKE_SUBMIT_SUCCESS, data : result, title});
    }
    catch(e) {
        dispatch({ type : LIKE_SUBMIT_ERROR, error : e, title });
    };

};

export const getCommentList = (title) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : COMMENTLIST, title }); //데이터 초기 요청 시작


    try {
        const data = await CommentList(title); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        dispatch({ type : COMMENTLIST_SUCCESS, data , title });
    }
    catch(e) {
        dispatch({type : COMMENTLIST_ERROR, error : e, title });
    }
};


export const getComment = (id) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : COMMENT, id}); //데이터 초기 요청 시작


    try {
        const data = await Comment(id); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        dispatch({ type : COMMENT_SUCCESS, data, id });
    }
    catch(e) {
        dispatch({type : COMMENT_ERROR, error : e,  });
    }
};

export const getCommentSubmit = (comment, title) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : COMMENTLIST, title}); //데이터 초기 요청 시작

    try {
        const data = await CommentSubmit(comment); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        const data2 = await CommentList('추천순');
        dispatch({ type : COMMENTLIST_SUCCESS, data, title });
        dispatch({ type : COMMENTLIST_SUCCESS, data : data2, title : '추천순' });
    }
    catch(e) {
        dispatch({type : COMMENTLIST_ERROR, error : e, title : title});
    }
};

export const getCommentUpdate = (comment, title) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : COMMENTLIST, title }); //데이터 초기 요청 시작

    try {
        const data = await CommentUpdate(comment); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        const data1 = await CommentList('추천순');
        dispatch({ type : COMMENTLIST_SUCCESS, data , title });
        dispatch({ type : COMMENTLIST_SUCCESS, data : data1, title : '추천순' });
        dispatch({ type : COMMENT_SUCCESS, data : comment, id : comment.id });
    }
    catch(e) {
        dispatch({type : COMMENTLIST_ERROR, error : e, title});
    }
};

export const getCommentDelete = (id, title) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : COMMENTLIST, title}); //데이터 초기 요청 시작

    try {
        const data = await CommentDelete(id); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        const data1 = await CommentList('추천순');
        dispatch({ type : COMMENTLIST_SUCCESS, data , title });
        dispatch({ type : COMMENTLIST_SUCCESS, data : data1, title : '추천순' });
    }
    catch(e) {
        dispatch({type : COMMENTLIST_ERROR, error : e, title});
    }
};

export const getCommentRecommend = (comment) => async(dispatch) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : COMMENT, id : comment.id}); //데이터 초기 요청 시작


    try {
        let newdata;
        const data = await CommentRecommend(comment); //data를 요청할 때 추후 title을 이용해서 데이터 요청
        if(data) {
            window.alert("댓글 추천 등록에 성공하셨습니다.");
            newdata = {...comment, recommend : comment.recommend + 1};
        }
        else {
            window.alert("댓글 추천 취소에 성공하셨습니다.");
            newdata = {...comment, recommend : comment.recommend - 1};
        }
        dispatch({ type : COMMENT_SUCCESS, data : newdata, id : comment.id });
        const data1 = await CommentList('최신순');
        const data2 = await CommentList('추천순');
        dispatch({ type : COMMENTLIST_SUCCESS, data : data1, title : '최신순' });
        dispatch({ type : COMMENTLIST_SUCCESS, data : data2, title : '추천순' });
    }
    catch(e) {
        dispatch({type : COMMENT_ERROR, error : e, id : comment.id });
    }
};

export const getPage = (title, page) => async(dispatch, getState) => { //redux-thunk로 함수 내에서 비동기 처리

    dispatch({type : LIST, title }); //데이터 초기 요청 시작


    try {
            const datas = await SubmitPage(title, page); //data를 요청할 때 추후 title을 이용해서 데이터 요청
            const { data } = getState().wuxia.list[title];
        
            if(data) {
                const newdata = data.concat(datas);
                dispatch({ type : LIST_SUCCESS, data : newdata, title });
            }
            else {
                dispatch({ type : LIST_SUCCESS, data : datas, title });
            }
        }
    catch(e) {
        dispatch({type : LIST_ERROR, error : e , title });
    }
}








