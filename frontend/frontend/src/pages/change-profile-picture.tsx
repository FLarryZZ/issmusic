import React from 'react'
import { ButtonST } from '../components/ButtonST'
import avatar from '../assets/images/avatar.png'
import '../design/changepp.css'
import { NavLink } from 'react-router-dom'

const ChangePP = () => {
  return (
    <div className='profile-settings-container'>
    <div className='naslov-forme-ps'>
        <p className='crni-tekst-veliki-ps'>Profile</p>
        <p className='crveni-tekst-veliki-ps'>settings.</p>
    </div>
    <div className='podnaslov-ps'>
        <p className='crni-tekst-ps'>Change your profile picture</p>
    </div>
        <div className='img-button'>
        <img className='picture-pp' src={avatar} alt="" />
        <ButtonST content='Upload new image' width='172px' bg='#DE8667'  fg='#FFFFFF'/>
        </div>
   
    <div className='submit-i-cancel-buttons-ps'>
        <ButtonST content='Save Changes' width='137px' bg='#DE8667'  fg='#FFFFFF'/>
        <NavLink to={"/settings"}><ButtonST content='Cancel' bg='#FFFFFF'/></NavLink>
    </div>
</div>

  )
}

export default ChangePP