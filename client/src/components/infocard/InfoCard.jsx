import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../profilemodal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from "../../api/UserRequest.js"
import { logOut } from '../../actions/AuthAction'

const InfoCard = () => {
  
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false)

  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})

  const {user} = useSelector((state) => state.authReducer.authData)

  const handleLogOut = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    const fetchProfileUser = async()=> {
      if (profileUserId === user._id) {
        setProfileUser(user)
      }  else {
        console.log("Checking...")
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    };
    fetchProfileUser();
  }, [user])
  
  return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Your Info</h4>
        {user._id === profileUserId ?(
          <div>
            <UilPen width='2rem' height='1.2rem' onClick={()=> setModalOpened(true)} />
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
          </div>
        ) : ("") }
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span> {profileUser.relationship} </span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className='button logout-button' onClick={handleLogOut} >Logout</button>
    </div>
  );
};

export default InfoCard