import {createStore} from 'redux';
import {userInfo} from './reducer';

export const store = createStore(userInfo);