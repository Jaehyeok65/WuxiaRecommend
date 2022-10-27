import { combineReducers } from 'redux'
import wuxia from './wuxia';
import comment from './comment';

const rootreducer = combineReducers({ wuxia, comment });

export default rootreducer;