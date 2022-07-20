import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';

const User = ({person}) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(person.followers.includes(user._id))

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const handleFollow =() => {
    if (following) {
      dispatch(unFollowUser(person._id, user))
      setFollowing(false);
    } else if(!following) {
      dispatch(followUser(person._id, user))
      setFollowing(true);
    }
  };

  // const handleFollow =() => {
  //   following ? 
  //   dispatch(unFollowUser(person._id, user)) : 
  //   dispatch(followUser(person._id, user))

  //   setFollowing((prev)=>!prev);
  // };

  return (
    <div className='follower'>
      <div>
        <img 
          src={person.coverPicture 
            ? serverPublic + person.profilePicture 
            : serverPublic + "defaultProfile.png" 
          } 
          alt="" 
          className='followerImage' />

        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button className={following ? 'button ic-button unfollowButton' : 'button ic-button' } onClick={handleFollow} >{following ? "Unfollow" : "Follow"}</button>
    </div>
  );
};

export default User