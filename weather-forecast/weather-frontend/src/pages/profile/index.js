import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { forecasts } from '../../data';
import MenuAppBar from '../../component/menu-bar';
import config from '../../config';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './style.css';

export default function Profile(props) {
  return (
    <div>
      <MenuAppBar title="Profile" />
      <section className="profile-section">
        <div className="photo-container">
          <img className="profile-photo" src="/images/profile.png" alt="profile-photo" />
          <AddAPhotoIcon color="primary" fontSize="large" onClick={} style={{ position: 'absolute', bottom: 0, right: 0 }}></AddAPhotoIcon>
        </div>
      </section>
    </div>

  )
}