import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../api/UserRequest'
import FollowersModal from '../followersModal/FollowersModal'
// import { Fol } from '../../Data/FollowersData'
import User from '../user/User'

import './FollowersCard.css'

const FollowersCard = ({ location }) => {

  const [modalOpened, setModalOpened] = useState(false);

  const [persons, setPersons] = useState([])

  const {user} = useSelector((state) => state.authReducer.authData);

  useEffect(()=> {
    const fetchPersons = async () => {
      const {data} = await getAllUsers();
      setPersons(data)
    };
    fetchPersons()
  },[])
  return (
    <div className="FollowersCard">
      <h3>Tech people you may know</h3>

      {/* {Fol.map((follow) => {
        return (
          <h1>{follow.name}</h1>
        )
      })} */}

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return (
            <User person={person} key={id} />
          )
        } else {
          return null
        }
         
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)} >Show More</span>
      ) : (
        ""
      )}

      <FollowersModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default FollowersCard;