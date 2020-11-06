export const SET_NAME = 'SET_NAME';
export const SET_AVATAR = 'SET_AVATAR';
export const INIT_USERINFO = 'INIT_USERINFO';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT'

export function setName(name) {
  return {
    type:SET_NAME,
    payload: name,
  }
}

export function setAvatar(avatar){
  return {
    type: SET_AVATAR,
    payload: avatar
  }
}

export function initUserInfo() {
  return {
    type: INIT_USERINFO
  }
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  }
}

export function loginFailed() {
  return {
    type: LOGIN_FAILED
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}