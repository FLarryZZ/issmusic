import React, { useEffect, useState } from 'react'
import "../design/welcome-to-qoutastic.css";
import welcome from '../assets/images/welcome.png'
import group_qoute from '../assets/images/qoute-group.png'
import { NavLink, useLocation } from 'react-router-dom';
import { ButtonST } from '../components/ButtonST';
import { useSelector } from 'react-redux';
import MostUpvoted from './most-upvoted-quotes';
import axios from 'axios';
import { Quote } from '../interfaces/Quote.interface';
import avatar from '../assets/images/avatar.png'
const Welcome = () => {
    const location = useLocation().pathname
    const user = useSelector((state: any) => state?.user.value)
    
  useEffect(() => {
    GetQuotes();
  }, []);


  const [loading, setLoading] = useState(false)
  const [randomquote,setRadnomQuote]=useState<Quote>({author:"",score:0,content:"",id:0,user:null})
  const GetQuotes = async () => {
    try {
      const res = await axios.get('mostupvoted/quotes');

      setRadnomQuote(res.data[Math.floor(Math.random() * res.data.length)]);
      setLoading(true);
    }
    catch (err) {
      console.log(err);
    }
  }

    const renderWelcome = () => {
        switch (location) {
            case "/":
                return (
                    <>
                        <div className='flex-container'>


                            <div className='flex-child'>
                                <img src={welcome} alt="" className='welcome_image' />
                                <p className='text_under_welcome'>Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.
                                </p>
                                <NavLink to={'signup'}>
                                    <ButtonST content='Sign up' width='100px' height='30px' border='#EFB467' bg='#DE8667' fg='#FFFFFF' />
                                </NavLink>
                            </div>

                            <div className='flex-child'>
                                <img src={group_qoute} alt="" className='group_image' />
                            </div>



                        </div>
                        <div className='welcome_to_the'>
                            <div className='welcome_signup'>
                                <p className='welcome_crni_tekst'>Explore the world of </p>
                                <p className='welcome_crveni_tekst'>fantastic quotes</p>
                            </div>
                        </div>
                    </>

                )

            default:
                return (
                    <></>
                )
        }
    }
    const renderRandomQuote=() =>{
        return(
            <div className='center'>
           <div className='welcome_crveni_tekst_random_quote'>Quote of the day</div>
           <div className='welcome_crni_tekst_random_quote'>Quote of the day is randomly chosen quote.</div>
         
             
                <MostUpvoted id={randomquote?.id} key={randomquote?.id} user_id={randomquote?.user?.id}
                content={randomquote?.content} author={randomquote?.user?.first_name+ ' '+ randomquote?.user?.last_name} score={randomquote?.score}  ></MostUpvoted>
              
         
           </div>
        )
    }
    return (
        !loading ? (<div></div>) :
        <> {
             user ? renderRandomQuote() : renderWelcome()
        }
        </>
     

    )
}

export default Welcome