import { handleAsyncActionsbyTitle, handleAsyncActions } from "./wuxia";
import { COMMENT, COMMENT_SUCCESS, COMMENT_ERROR, COMMENTLIST, COMMENTLIST_SUCCESS, COMMENTLIST_ERROR } from '../action';
import { COMMENTRECOMMEND, COMMENTRECOMMEND_SUCCESS, COMMENTRECOMMEND_ERROR} from '../action';


export const handleAsyncActionsbyId = (type, key, keepdata = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
  
      const id = action.id; //액션에서 넘어온 데이터
      
      switch (action.type) {
        case type:
          return {
            ...state,
            [key]: {
              ...state[key],
              [id] : {
                loading : keepdata ? false : true,
                data : keepdata ? state[key][id] && state[key][id].data : null,
                error : null
              }
            }
          };
        case SUCCESS:
          return {
            ...state,
            [key]: {
              ...state[key],
              [id] : {
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
              [id] : {
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
    commentlist : {
        '1' : {
            loading : false,
            data : null,
            error : null
        }
    },
    comment : {
        '1' : {
            loading : false,
            data : null,
            error : null
        }
    }
};

export default function comment(state = initialState, action) {
    switch (action.type) {
      case COMMENTLIST:
      case COMMENTLIST_SUCCESS :
      case COMMENTLIST_ERROR :
        return handleAsyncActionsbyTitle(COMMENTLIST,'commentlist')(state, action);
      case COMMENT:
      case COMMENT_SUCCESS :
      case COMMENT_ERROR :
        return handleAsyncActionsbyId(COMMENT,'comment', true)(state, action);
      case COMMENTRECOMMEND:
      case COMMENTRECOMMEND_SUCCESS :
      case COMMENTRECOMMEND_ERROR :
        return handleAsyncActionsbyId(COMMENTRECOMMEND,'comment',true)(state, action);
      case 'COMMENT_DELETE' :
        delete state.comment[action.id] //객체에 id로 넘어온 키를 삭제함;
          return state;
      default:
        return state;
    }
  }


