import { INIT, INIT_SUCCESS, INIT_ERROR, PRODUCT, PRODUCT_SUCCESS, PRODUCT_ERROR } from '../action';


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
        return {
          ...state,
          wuxias: {
            loading: true,
            data: null,
            error: null
          }
        };
      case INIT_SUCCESS:
        return {
          ...state,
          wuxias: {
            loading: false,
            data: action.wuxias,
            error: null
          }
        };
      case INIT_ERROR:
        return {
          ...state,
          wuxias: {
            loading: false,
            data: null,
            error: action.error
          }
        };
      case PRODUCT:
        return {
          ...state,
          wuxia: {
            loading: true,
            data: null,
            error: null
          }
        };
      case PRODUCT_SUCCESS:
        return {
          ...state,
          wuxia: {
            loading: false,
            data: action.wuxia,
            error: null
          }
        };
      case PRODUCT_ERROR:
        return {
          ...state,
          wuxia: {
            loading: false,
            data: null,
            error: action.error
          }
        };
      default:
        return state;
    }
  }