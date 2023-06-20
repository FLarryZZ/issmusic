import React from 'react'
import "../design/footer.css";
import quote from '../assets/images/logo-mark.png'
const Footer = () => {
  return (
    <footer className='footer'>
      <div>
        <img src={quote} alt='qoute-logo' />
        <p>All Rights Reserved | skillupmentor.com</p>

      </div>
    </footer>
  )
}

export default Footer