import { combineReducers } from 'redux'
import wuxia from './wuxia';
import comment from './comment';
import modal from './modal';

const rootreducer = combineReducers({ wuxia, comment, modal });

export default rootreducer;