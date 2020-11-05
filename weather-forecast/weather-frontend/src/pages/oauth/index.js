import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config'
import Typography from '@material-ui/core/Typography';

const OAuth = (props) => {
  const { BACKEND_URL } = config;
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
          if(response.code === 200) {
            console.log(response.data)
          }
        })
    }
  }, [BACKEND_URL])
  return (
    <Typography variant="h4">Redirecting....</Typography>
  );
}

export default OAuth;