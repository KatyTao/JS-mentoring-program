import React, { useState, useEffect } from 'react';
import config from '../../config'
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { setName, setAvatar, loginSuccess, loginFailed } from '../../action';

const OAuth = () => {
  const dispatch = useDispatch()
  const { BACKEND_URL } = config;
  const [notification, setNotification] = useState('Redirecting...')
  const param = new URLSearchParams(window.location.search);
  console.log(param.get('code'))
  useEffect(() => {
    if (param.get('code')) {
      const payload = {
        code: param.get('code')
      }
      fetch(`${BACKEND_URL}/authorization_code`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(payload)
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.code === 200) {
            setNotification('Login Success!')
            dispatch(setName(response.data.name))
            dispatch(setAvatar(response.data.avatar_url))
            dispatch(loginSuccess())
          } else {
            dispatch(loginFailed())
            setNotification('Login Failed, please try again later')
          }
          window.location.href='/'
        }).catch((error) => {
          console.log(error)
          setNotification('Login Failed, please try again later')
          window.location.href='/'
        })
    }
  }, [BACKEND_URL])
  return (
      <Typography variant="h4">{notification}</Typography>
  );
}

export default OAuth;