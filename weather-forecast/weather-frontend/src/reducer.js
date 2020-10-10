import { CHNAGE_CITY } from './actionCreator';

export const updateCity = (state = '', action) => {
  switch (action.type) {
    case CHNAGE_CITY:
      return action.payload
    default:
      return state;
  }
}