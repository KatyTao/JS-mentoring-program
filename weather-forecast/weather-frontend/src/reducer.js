
const INIT = {
  userName:'',
  avatar:'',
}

export const userInfo = (state = INIT, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {...state, userName: action.userName}
    case 'SET_AVATAR':
      return {...state, avatar: action.avatar}
    default:
      return state;
  }
}

