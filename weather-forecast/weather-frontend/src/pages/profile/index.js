import React, { useState } from 'react';
import MenuAppBar from '../../component/menu-bar';
import config from '../../config';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './style.css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { setAvatar} from '../../action';

export default function Profile() {
  const { BACKEND_URL } = config;
  const userInfo = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatar);
  const addPhoto = () => {
    hiddenFileInput.current.click();
  }

  const hiddenFileInput = React.useRef(null);

  const onChangeHandler = (event) => {
    const fileUploaded = event.target.files[0];
    console.log('fileUploaded', fileUploaded)
    const formData = new FormData();
    formData.append("file", fileUploaded);
    console.log('formData', formData.get('file'))
    axios({
      method: 'post',
      url: `${BACKEND_URL}/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          dispatch(setAvatar(res.data.url))
          setAvatarUrl(res.data.url)
        }
      })
  }
  return (
    <div>
      <MenuAppBar title="Profile" />
      <section className="profile-section">
        <div className="photo-container">
          <img className="profile-photo" src={avatarUrl} alt="profile" />
          <AddAPhotoIcon color="primary" fontSize="large" onClick={addPhoto} style={{ position: 'absolute', bottom: 0, right: '10px', cursor: 'pointer' }}></AddAPhotoIcon>
          <input ref={hiddenFileInput} style={{ display: 'none' }} type="file" name="file" onChange={onChangeHandler} />
        </div>
      </section>
    </div>

  )
}