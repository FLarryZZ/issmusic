import { yupResolver } from '@hookform/resolvers/yup'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { ButtonST } from '../components/ButtonST'
import { InputStyled } from '../components/input_form'
import '../design/profile-settings.css'
import { setUser } from '../interfaces/reducer/User.reducer'
import { PatchRequest } from '../services/PatchRequest.service'

import { ProfileSchema } from '../validation/schemas/Profile.schema'
const ProfileSettings = () => {
    const dispatch=useDispatch()
    const user = useSelector((state: any) => state?.user.value)
    const [redirect,setRedirect] = useState(false)
    const {register,handleSubmit,formState: {errors}}=useForm<{email:string,first_name:string,last_name:string}>({
        resolver: yupResolver(ProfileSchema)
    })
    const UpdateUser= handleSubmit(
        async (data,event)=> {
            event?.preventDefault()
            const response=await PatchRequest('/me',{email:data.email,first_name:data.first_name,last_name:data.last_name})
          
            await dispatch(setUser(data))
            setRedirect(true)
           
            
        }
    )
    
    return (
        redirect ? <Navigate to = {"/profile-settings-saved"}/> :
        <form onSubmit={UpdateUser}>
        <div className='profile-settings-container'>
           
            <div className='naslov-forme-ps'>
                <p className='crni-tekst-veliki-ps'>Profile</p>
                <p className='crveni-tekst-veliki-ps'>settings.</p>
            </div>
            <div className='podnaslov-pss'>
                <p className='crni-tekst-ps'>Change your profile settings</p>
            </div>
            <p className='email-oznaka-ps'>Mail </p>
            <InputStyled  value={user?.email}  register={register} name="email" type='text' width='536px'></InputStyled>
            <div className='oznake-linijske-ps'>
                <p className='oznaka_ime-ps'  >First Name</p>
                <p className='oznaka_prezime-ps' >Last Name</p>
            </div>
            <div className='linijski_input-ps'>

                <InputStyled value={user?.first_name} register={register} name="first_name" type='text' width='256.5px' />

                <InputStyled value={user?.last_name}  register={register} name="last_name" type='text' width='256.5px' />
            </div>
            <div className='linijski_input-ps'>

            <NavLink to='/password'>
                <ButtonST  width='240px' content='Change password'  bg='#EFB467' fg='#FFF'/>
                </NavLink>

                <NavLink to='/avatar'>
                <ButtonST content='Change profile picture' bg='#DE8667' fg='#FFF' width=' 240px' />
                </NavLink>
            </div>
            <div className='submit-i-cancel-buttons-ps'>
                <ButtonST content='Submit' width='127px'  bg='#DE8667'  fg='#FFFFFF'/>
                <NavLink to={"/"}><ButtonST content='Cancel' bg='#FFFFFF'/></NavLink>
            </div>
       
        </div>
        </form>
    )
}

export default ProfileSettings