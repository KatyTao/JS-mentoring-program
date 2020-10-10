import {createStore} from 'redux';
import {updateCity} from './reducer';

export const store = createStore(updateCity);