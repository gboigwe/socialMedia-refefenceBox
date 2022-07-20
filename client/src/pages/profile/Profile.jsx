import React from 'react'

import ProfileLeft from '../../components/profileleft/ProfileLeft'
import ProfileCard from "../../components/profilecard/ProfileCard"
import PostSide from "../../components/postside/PostSide"
import RightSide from "../../components/rightside/RightSide"

import './Profile.css'

const Profile = () => {
  return (
    <div className='Profile' >
      <ProfileLeft />

      <div className="profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>

      <RightSide />
    </div>
  )
}

export default Profile