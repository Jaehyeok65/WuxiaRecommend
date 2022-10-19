import { actions } from '@storybook/addon-actions';
import { INIT, INIT_SUCCESS, INIT_ERROR, PRODUCT, PRODUCT_SUCCESS, PRODUCT_ERROR } from '../action';
import { STAR_SUBMIT, STAR_SUBMIT_SUCCESS, STAR_SUBMIT_ERROR } from '../action';

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
    wuxias: {
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
    wuxia: {
      loading: false,
      data: null,
      error: null
    }
  };


export default function wuxia(state = initialState, action) {
    switch (action.type) {
      case INIT:
      case INIT_SUCCESS :
      case INIT_ERROR :
        return handleAsyncActionsbyTitle(INIT,'wuxias')(state, action);
      case PRODUCT:
      case PRODUCT_SUCCESS:
      case PRODUCT_ERROR:
        return handleAsyncActions(PRODUCT,'wuxia')(state, action);
      case STAR_SUBMIT:
      case STAR_SUBMIT_SUCCESS:
      case STAR_SUBMIT_ERROR:
        return handleAsyncActions(STAR_SUBMIT,'wuxia',true)(state, action);
      default:
        return state;
    }
  }