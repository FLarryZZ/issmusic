import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { ButtonST } from '../components/ButtonST'
import { InputStyled } from '../components/input_form'
import { setUser } from '../interfaces/reducer/User.reducer'
import { PatchRequest } from '../services/PatchRequest.service'
import { PasswordSchema } from '../validation/schemas/PasswordSchema'
import { ProfileSchema } from '../validation/schemas/Profile.schema'

const ChangePassword = () => {
 
    const user = useSelector((state: any) => state?.user.value)
    const [redirect,setRedirect] = useState(false)
    const {register,handleSubmit,formState: {errors}}=useForm<{current_password:string,password:string,confirm_password:string}>({
        resolver: yupResolver(PasswordSchema)
    })
    const ChangePassword= handleSubmit(
        async (data,event)=> {
            event?.preventDefault()
            const response=await PatchRequest('/me/update-password',{current_password:data.current_password,password:data.password,confirm_password:data.confirm_password})
          
           
            setRedirect(true)
           
            
        }
    )
  return (
    redirect ? <Navigate to = {"/passwordischanged"}/> :
    <form onSubmit={ChangePassword}>
    <div className='profile-settings-container'>
    <div className='naslov-forme-ps'>
        <p className='crni-tekst-veliki-ps'>Profile</p>
        <p className='crveni-tekst-veliki-ps'>settings.</p>
    </div>
    <div className='podnaslov-ps'>
        <p className='crni-tekst-ps'>Change your profile settings</p>
    </div>
    <p className='email-oznaka-ps'>Current password </p>
    <InputStyled register={register} name="current_password" type='text' width='536px'></InputStyled>
    <p className='email-oznaka-ps'>New password </p>
    <InputStyled register={register} name="password" type='text' width='536px'></InputStyled>
    <p className='email-oznaka-ps'>Confirm new password </p>
    <InputStyled register={register} name="confirm_password" type='text' width='536px'></InputStyled>
    
   
    <div className='submit-i-cancel-buttons-ps'>
        <ButtonST content='Save Changes' width='137px' bg='#DE8667'  fg='#FFFFFF'/>
        <NavLink to={"/settings"}><ButtonST content='Cancel' bg='#FFFFFF'/></NavLink>
    </div>
</div>
</form>
  )
}

export default ChangePassword