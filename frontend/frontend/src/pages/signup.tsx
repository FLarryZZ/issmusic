import React, { useEffect, useState } from 'react';
import { InputStyled } from '../components/input_form';
import '../design/signup.css'
import avatar from '../assets/images/avatar.png'
import { ButtonST } from '../components/ButtonST';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from '../validation/schemas/Register.schema';
import styled from 'styled-components';
import { PostRequest } from '../services/PostRequest.service';
import { Navigate } from 'react-router-dom';
import { setUser } from '../interfaces/reducer/User.reducer';
import { GetMe } from '../services/Me.service';
import { useDispatch } from 'react-redux';

const Message = styled.p`
    margin-top: 4px;
    margin-left: 24px;
    font-style: italic;
    font-size: 12px;
    color: #ef1102;
`

function Signup() {
    const dispatch = useDispatch()
    const [message, setMessage] = useState(" ")
    const [redirect,setRedirect] = useState(false)
    const {register,handleSubmit,formState: {errors}}=useForm<{email: string, password: string, confirm_password: string,first_name: string, last_name: string}>({
        resolver: yupResolver(RegisterSchema)
    })
    
    const Submit= handleSubmit(
        async (data,event)=> {
            event?.preventDefault()
            const response=await PostRequest("register",data)
            await setMessage(response.response?.data?.message || "")
          
        }
    )

    
    useEffect(()=>{
        if(!message.length) {
            (async() => {
              const {data} = await GetMe()
              dispatch(setUser(data))
            })()
            setRedirect(true)
          }
    },[message]) //triggers on every msg change

    return (
        redirect ? <Navigate to = {"/"}/> :
        <div className='signup_container'>
            <form onSubmit={ Submit }>
                <div className='naslov_signup'>
                    <p className='crni-tekst-naslov'>What is your</p>
                    <p className='crveni-tekst-naslov'>name?</p>

                </div>
                <div className='podnaslov_signup'>
                    <p className='crni-tekst'>Your name will appear on quotes and your public profle.</p>
                    </div>
                <div className='avatar_container'>
                     <img  src={avatar} alt="" />
                     </div>
                
                <label className='oznaka_email_signup' >Email</label><br />
                <InputStyled register={register} name="email" type='email' width='367px' />
                <Message>{errors.email?.message}</Message>
                <div className='oznake_u_liniji'>
                    <p className='oznaka_ime'  >First Name</p> 
                    <p className='oznaka_prezime' >Last Name</p> 
                </div>

                <div className='linijski_input'>

                    <InputStyled register={register} name="first_name" type='text' width='150px' />

                    <InputStyled register={register} name="last_name" type='text' width=' 150px' />
                   
                </div>
                <label className='oznaka_sifra_signup' >Password</label><br />
                <InputStyled register={register} name="password" type='password' width='367px' />
                <Message>{errors.password?.message}</Message>
                <label className='oznaka_potvrdi_sifru_signup' >Confirm Password</label><br />
                <InputStyled register={register} name="confirm_password" type='password' width='367px' />
                <Message>{errors.confirm_password && "Passwords should match"}</Message>
                <ButtonST content='Sign up' width='367px' border='#EFB467' bg='#DE8667' fg='#FFFFFF' />
                <Message>{message }</Message>
                <div className='vec_postojeci_acc'>
                    <p>Already have an account? <a className='gas' href="/login">Sign in</a></p>
                </div>
            </form>
        </div>
    )
}
export default Signup;