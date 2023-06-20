import React from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonST } from '../components/ButtonST'
import '../design/profile-settings-saved.css'
const ProfileSettingsSaved = () => {
  return (
    <div className='settings-saved-container'>
    <div className='naslov-forme-pss'>
        <p className='crni-tekst-veliki-pss'>Profile</p>
        <p className='crveni-tekst-veliki-pss'>settings.</p>
    </div>
    <div className='podnaslov-pss'>
        <p className='crni-tekst-pss'>Your settings are saved.</p>
    </div>
    
    <div className='close-btn-pss'>
        <NavLink to={'/settings'}><ButtonST content='Close' width='107px' bg='#DE8667'  fg='#FFFFFF'/></NavLink>
    
    </div>
</div>
  )
}

export default ProfileSettingsSaved