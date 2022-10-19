import { INIT, INIT_SUCCESS, INIT_ERROR, PRODUCT, PRODUCT_SUCCESS, PRODUCT_ERROR } from '../action';
import { STAR_SUBMIT, STAR_SUBMIT_SUCCESS, STAR_SUBMIT_ERROR } from '../action';

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            loading : true,
            data : null,
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
const initialState = {
    wuxias: {
      loading: false,
      data: null,
      error: null
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
        return handleAsyncActions(INIT,'wuxias')(state, action);
      case PRODUCT:
      case PRODUCT_SUCCESS:
      case PRODUCT_ERROR:
        return handleAsyncActions(PRODUCT,'wuxia')(state, action);
      case STAR_SUBMIT:
      case STAR_SUBMIT_SUCCESS:
      case STAR_SUBMIT_ERROR:
        return handleAsyncActions(STAR_SUBMIT,'wuxia')(state, action);
      default:
        return state;
    }
  }