import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom';
import { ButtonST } from '../components/ButtonST';
import "../design/create-quote.css";
import { Quote } from '../interfaces/Quote.interface';
const ConfirmDeleteQuote = () => {
  const [redirect, setRedirect] = useState(false)
  const id = useParams().id

  useEffect(() => {

  }, [redirect]);
  const DeleteQuote = async () => {

    const res = await axios.delete(`deletequote/${id}`);

    setRedirect(true);
    
  }


  return (
    redirect ? <Navigate to={"/delete-quote-confirm"} /> :


      <div className='create-quote-container'>
        
          <div className='naslov-forme-quota'>
            <p className='crni-tekst-veliki-cq'>Are you sure?</p>

          </div>
          <div className='podnaslov-cq'>
            <p className='crni-tekst-cq'>This quote will be deleted. There is no undo of this action.</p>
          </div>
          <div className='submit-i-cancel-buttons'>
            <a onClick={DeleteQuote} ><ButtonST content='Delete' width='137px' bg='#DE8667' fg='#FFFFFF' /></a>
            <NavLink to={'/'}><ButtonST content='Cancel' bg='#FFFFFF' /></NavLink>
          </div>
        
      </div>

  )
}

export default ConfirmDeleteQuote