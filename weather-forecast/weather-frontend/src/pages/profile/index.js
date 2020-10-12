import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { forecasts } from '../../data';
import MenuAppBar from '../../component/menu-bar';
import config from '../../config'

export default function Profile(props) {
  return (
    <div>
    <MenuAppBar title="Profile"/>
    <section className="profile-section">

    </section>
    </div>

  )
}