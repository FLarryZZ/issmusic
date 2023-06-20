import React, { useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components';
import "../design/navbar.css";
import logo from '../assets/images/logo.png'
import logowhite from '../assets/images/logo-white.png'
import { ButtonST } from '../components/ButtonST';
import bi_plus from '../assets/images/bi_plus.svg'
import { useSelector, useDispatch } from 'react-redux';
import { unsetUser } from '../interfaces/reducer/User.reducer';
import { PostRequest } from '../services/PostRequest.service';
import ImgST from '../components/ImgST';
import avatar from '../assets/images/avatar.png'

const AnchorContainer = styled.div`

  & div{
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  width: auto !important;
`
const Links = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    text-decoration: none;
    text-align: center;
    margin-left: 10px;
    /* Orange */

   color: ${props=>props.color || '#DE8667'};
  
`
const Logout= async  () => {
  await PostRequest('logout')
}

const Navbar = () => {
  const page_id = useParams().id
  const user = useSelector((state: any) => state?.user.value)
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const [menu, setMenu] = useState(false)
 const custom=location.split('/')


  const LogoCheck=()=>{
    switch(location){
    case "/profile":
      return(
        <div className='logo'><NavLink to={'/'}><img src={logowhite} alt='logo' />
      </NavLink></div>
      )
      case `/profile-page/${custom[2]}`:
        return(
          <div className='logo'><NavLink to={'/'}><img src={logowhite} alt='logo' />
        </NavLink></div>
        )
      default:
        return(
          <div className='logo'><NavLink to={'/'}><img src={logo} alt='logo' />
          </NavLink></div>
        )
        }
  }
  const authBtns = () =>{
  
     switch(location){
      case "/profile":
      return(
        <AnchorContainer>
        <div><NavLink to={'/'}>
        <Links color="#FFF" >Home</Links>
       </NavLink></div>
       <div><NavLink to={'settings'}>
        <Links color="#FFF">Settings</Links>
       </NavLink></div>
       <div><NavLink onClick={() => { Logout(); dispatch(unsetUser()) }}  to={'login'}>
        <Links color="#FFF">Logout</Links>
       </NavLink></div>
       <div><NavLink to={'profile'}>
        <Links><ImgST url={avatar} width="49.5px"></ImgST></Links>
       </NavLink></div>
       <div><NavLink to={'myquote'}>
        <ImgST url={bi_plus} width="39px" />
       </NavLink></div>
       </AnchorContainer>
      )
      case `/profile-page/${custom[2]}`:
        return(
          <AnchorContainer>
          <div><NavLink to={'/'}>
          <Links color="#FFF" >Home</Links>
         </NavLink></div>
         <div><NavLink to={'settings'}>
          <Links color="#FFF">Settings</Links>
         </NavLink></div>
         <div><NavLink onClick={() => { Logout(); dispatch(unsetUser()) }}  to={'login'}>
          <Links color="#FFF">Logout</Links>
         </NavLink></div>
         <div><NavLink to={'profile'}>
          <Links><ImgST url={avatar} width="49.5px"></ImgST></Links>
         </NavLink></div>
         <div><NavLink to={'myquote'}>
          <ImgST url={bi_plus} width="39px" />
         </NavLink></div>
         </AnchorContainer>
        )
      default:
        return(
          <AnchorContainer>
          <div><NavLink to={'/'}>
          <Links >Home</Links>
         </NavLink></div>
         <div><NavLink to={'settings'}>
          <Links>Settings</Links>
         </NavLink></div>
         <div><NavLink onClick={() => { Logout(); dispatch(unsetUser()) }}  to={'login'}>
          <Links>Logout</Links>
         </NavLink></div>
         <div><NavLink to={'profile'}>
          <Links><ImgST url={avatar} width="40px"></ImgST></Links>
         </NavLink></div>
         <div><NavLink to={'myquote'}>
          <img src={bi_plus} alt="" />
         </NavLink></div>
         </AnchorContainer>
        )
     }
    
  }

  const renderButtons= () => {
    switch(location){
      case "/register":
        return (
          <AnchorContainer>
           <div><NavLink to={'login'}>
            <ButtonST content='Login' width='100px' height='30px' border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' />

          </NavLink></div>
        </AnchorContainer>
        )
      case "/login":
        return (<AnchorContainer>
           <div><NavLink to={'register'}>
            <ButtonST content='Sign up' width='100px' height='30px' border='#EFB467' bg='#DE8667' fg='#FFFFFF' />
          </NavLink></div>
          </AnchorContainer>
        )
        
      default:
        return (
          <AnchorContainer>
           <div>
           <NavLink to={'register'}>
            <ButtonST content='Sign up' width='100px' height='30px' border='#EFB467' bg='#DE8667' fg='#FFFFFF' />
          </NavLink>
          <NavLink to={'login'}>
            <ButtonST content='Login' width='100px' height='30px' border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' />

          </NavLink>
           </div>
          </AnchorContainer>
        )  
    }
   
   
  }
  return (
    <nav className='navbar'>
      <div>
        {LogoCheck()}
        
        {user ? authBtns() : renderButtons()}

      </div>
    </nav>
  )
}

export default Navbar