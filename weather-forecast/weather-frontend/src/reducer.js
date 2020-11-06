import {
  SET_NAME,
  SET_AVATAR,
  INIT_USERINFO,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './action'

const initUserInfo = {
  userName: '',
  avatar: '/images/profile.png',
}

const initLoginState = {
  login: false,
}

export const userInfo = (state = initUserInfo, action) => {
  switch (action.type) {
    case SET_NAME:
      return { 
        ...state, 
        userName: action.payload 
      }
    case SET_AVATAR:
      return { 
        ...state, 
        avatar: action.payload 
      }
    case INIT_USERINFO:
      return initUserInfo;
    default:
      return state;
  }
}

export const loginState = (state = initLoginState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: true
      }
    case LOGIN_FAILED:
      return {
        ...state,
        login: false
      }
    case LOGOUT:
      return{ 
        ...state,
        login: false
      }
    default:
      return state;
  }
}