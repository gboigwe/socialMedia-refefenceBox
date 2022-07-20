import React from 'react'

import LogoSearch from '../logoSearch/LogoSearch'
import InfoCard from '../infocard/InfoCard'
import FollowersCard from '../followersCard/FollowersCard'

// import './ProfileLeft.css'

const ProfileLeft = () => {
  return (
    <div className='ProfileSide'>
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  )
}

export default ProfileLeft