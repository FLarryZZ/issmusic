import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MostUpvoted, { ThreeColumnGrid } from '../layouts/most-upvoted-quotes'
import Welcome from '../layouts/welcome-to-qoutastic'

import MUVQ from './muvq'
import MRQ from './mrq'
import axios from 'axios'
import { ButtonST } from '../components/ButtonST'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


const Homepage = () => {


  const user = useSelector((state: any) => state?.user.value)
  const [limit, updateLimit] = useState(9)
  const [recentlimit, updateRecentLimit] = useState(9)
  const [quotes, setQuotes] = useState([])
  const [recentquotes, setRecentQuotes] = useState([])
  const [loading, setLoading] = useState(false)
let gas= false;
  useEffect(() => {
    GetQuotes();
    GetRecentQuotes();
  }, [limit,recentlimit]);



  const GetQuotes = async () => {
    try {
      const res = await axios.get(`mostupvoted/quotes?limit=${limit}`);
     
      setQuotes(res.data);
      setLoading(true);
    }
    catch (err) {
    
    }
  }
  const GetRecentQuotes = async () => {
    try {
      const res = await axios.get(`mostrecent/quotes?limit=${recentlimit}`);
      
      setRecentQuotes(res.data);
      setLoading(true);
    }
    catch (err) {
      console.log(err);
    }
  }



  return (
    !loading ? (<div></div>) :
    <Content>
    
      <Welcome />
      <MUVQ/>

      <ThreeColumnGrid>
        {loading && quotes.map((quote: any) => {
            if(quote.user?.id===user?.id ) {
              gas=true;
             }
             else gas=false;
             
             return(
         
          <MostUpvoted   id={quote.id} key={quote?.id} user_id={quote.user?.id}
            content={quote.content} author={quote.user.first_name + ' ' + quote.user.last_name} score={quote.score} renderdelete={gas} ></MostUpvoted>
)

})}
      
      </ThreeColumnGrid>
     {user ? <a onClick={()=>updateLimit(prevlimit=>prevlimit+3)} > <ButtonST  content='Show More' width='137px' border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' ></ButtonST></a>
      : <NavLink  to={'register'} ><ButtonST  content='Signup' width='137px' border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' ></ButtonST></NavLink> }
  
  {loading && user ? <><MRQ></MRQ><ThreeColumnGrid>
        {loading && recentquotes.map((recentquote: any) => {
           if(recentquote.user?.id===user?.id ) {
            gas=true;
           }
           else gas=false;
           return(
          <MostUpvoted id={recentquote.id } user_id={recentquote.user?.id} key={recentquote?.id} 
            content={recentquote.content} author={recentquote.user.first_name + ' ' + recentquote.user.last_name} score={recentquote.score} renderdelete={gas}  ></MostUpvoted>
)})}
      
      </ThreeColumnGrid>
      {user ? <a onClick={()=>updateRecentLimit(prevlimit=>prevlimit+3)} > <ButtonST  content='Show More' width='137px'border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' ></ButtonST></a>
      : <NavLink  to={'register'} ><ButtonST  content='Signup' width='137px' border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' ></ButtonST></NavLink> }
  </> : <></>}

    </Content>
  )
}
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`
export default Homepage