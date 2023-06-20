import React, { useEffect, useState } from 'react';
import { InputStyled } from '../components/input_form';
import '../design/login.css'
import { ButtonST } from '../components/ButtonST';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../validation/schemas/Login.schema';
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

function Login(){
    const [message, setMessage] = useState(" ")
    const [redirect,setRedirect] = useState(false)
    const dispatch = useDispatch()
    const {register,handleSubmit,formState: {errors}}=useForm<{email: string, password: string}>({
        resolver: yupResolver(LoginSchema)
    })
    
  const submit = handleSubmit(async (data, event) => {
    event?.preventDefault()
    const response=await PostRequest("login",data)
    await setMessage(response.response?.data?.message || "")
  })

useEffect(() => {
    if(!message.length) {
      (async() => {
        const {data} = await GetMe()
        dispatch(setUser(data))
      })()
      setRedirect(true)
    }
  }, [message])
    
   
return (
    redirect ? <Navigate to = {"/"}/> :
    <div className='container'>
        <form onSubmit={submit}>
            <div className='naslov'>
                <p className='crni-tekst-naslov'>Welcome</p>
                <p className='crveni-tekst-naslov'>back!</p>
                
                </div>
                <div className='podnaslov'>
                <p className='crni-tekst'>Thank you for coming back. Hope you have a good day and inspire others.</p>
                </div>
          
            <label className='oznaka_email' >Email</label><br />
            <InputStyled type='email' register={register} name="email" width='420px'/>
            <Message>{errors.email?.message}</Message>
           
            <label className='oznaka_sifra' >Password</label><br />
            <InputStyled name="password" register={register} type='password'/>
            <Message>{errors.password?.message}</Message>

            <ButtonST  content='Login' width='420px 'border='#DE8667 3px solid' fg='#DE8667' bg='#FFFFFF'/>
            <Message>{message }</Message>
            <div className='zavrsni'>
            <p>Don't have  account? <a className='gas' href="/signup">Sign up</a></p>
            </div>
        </form>
    </div>
)
}
export default Login;


