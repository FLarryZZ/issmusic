import React from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonST } from '../components/ButtonST'
import '../design/edit-confirm.css'
const DeleteQuoteConfrim = () => {
  return (
   <div className="edit-container">
        <div className="naslov-forme-ec">
            <p className="crni-tekst-veliki-ec">Your</p>
            <p className="crveni-tekst-veliki-ec">quote</p>
            <p className="crni-tekst-veliki-ec">was deleted</p>
        </div>
        <div className='close-btn'>
        <NavLink to={'/'}><ButtonST content='Close' width='137px' bg='#DE8667'  fg='#FFFFFF'/></NavLink>
        </div>
   </div>
  )
}

export default DeleteQuoteConfrim