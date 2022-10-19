import { MAIN, MAIN_SUCCESS, MAIN_ERROR, PRODUCT, PRODUCT_SUCCESS, PRODUCT_ERROR } from '../action';
import { STAR_SUBMIT, STAR_SUBMIT_SUCCESS, STAR_SUBMIT_ERROR , LIST, LIST_SUCCESS, LIST_ERROR } from '../action';

export const handleAsyncActions = (type, key, keepdata = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            loading : keepdata ? false : true,
            data : keepdata ? state[key].data : false,
            error : null
          }
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            loading : false,
            data : action.data,
            error : null
          }
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            loading : false,
            data : null,
            error : action.error
          }
        };
      default:
        return state;
    }
  };
};

export const handleAsyncActionsbyTitle = (type, key, keepdata = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {

    const title = action.title; //액션에서 넘어온 데이터
    
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [title] : {
              loading : keepdata ? false : true,
              data : keepdata ? state[key][title] && state[key][title] : null,
              error : null
            }
          }
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [title] : {
              loading : false,
              data : action.data,
              error : null
            }
          }
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [title] : {
              loading : false,
              data : null,
              error : action.error
            }
          }
        };
      default:
        return state;
    }
  };
};
const initialState = {
    main : {
      loading : false,
      data : null,
      error : null
    },
    list: {
      '조회순' : {
        loading : false,
        data : null,
        error : null
      },
      '별점순' : {
        loading : false,
        data : null,
        error : null
      },
      '좋아요순' : {
        loading : false,
        data : null,
        error : null
      }
    },
    product: {
      loading: false,
      data: null,
      error: null
    }
  };


export default function wuxia(state = initialState, action) {
    switch (action.type) {
      case MAIN:
      case MAIN_SUCCESS :
      case MAIN_ERROR :
        return handleAsyncActions(MAIN,'main')(state, action);
      case LIST:
      case LIST_SUCCESS:
      case LIST_ERROR :
        return handleAsyncActionsbyTitle(LIST,'list')(state, action);
      case PRODUCT:
      case PRODUCT_SUCCESS:
      case PRODUCT_ERROR:
        return handleAsyncActions(PRODUCT,'product')(state, action);
      case STAR_SUBMIT:
      case STAR_SUBMIT_SUCCESS:
      case STAR_SUBMIT_ERROR:
        return handleAsyncActions(STAR_SUBMIT,'product',true)(state, action);
      default:
        return state;
    }
  }