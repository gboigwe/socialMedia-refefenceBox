import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
// import Cover from '../../img/cover.jpg'
// import Profile from '../../img/profileImg.jpg'

import './ProfileCard.css'

const ProfileCard = ({location}) => {

  const { user } = useSelector((state)=> state.authReducer.authData)
  const posts = useSelector((state)=> state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  // const ProfilePage = false;
  return (
    <div className='ProfileCard'>
      <div className="ProfileImages">
        <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg" } alt="Cover" />
        <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png" } alt="profile" />
      </div>

      <div className='ProfileName'>
        <span> {user.firstname} {user.lastname} </span>
        <span> {user.worksAt ? user.worksAt: "What can you offer?"} </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span> {user.following.length} </span>
            <span>Following</span> {/* Interactors */}
          </div>
          <div className="vl" />
          <div className="follow">
            <span> {user.followers.length} </span>
            <span>Followers</span> {/* Contribution */}
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span> {posts.filter((post)=> post.userId === user._id).length} </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

        {location === "profilePage" ? ('') :
          (
            <span>
              <Link style={{ color: 'inherit', textDecoration: "none" }} to = {`/profile/${user._id}`} >
                My Profile
              </Link>
            </span>
          )
        }
      
    </div>
  )
}

export default ProfileCard