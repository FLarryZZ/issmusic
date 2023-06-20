import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router';


import { ButtonST } from '../components/ButtonST';
import "../design/create-quote.css";
import { PostRequest } from '../services/PostRequest.service';
import { PostSchema } from '../validation/schemas/Post.schema';

function CreateQuote(){
    const [redirect,setRedirect] = useState(false)
    const {register,handleSubmit,formState: {errors}}=useForm<{content:string}>({
        resolver: yupResolver(PostSchema)
    })
    const Submit= handleSubmit(
        async (data,event)=> {
            event?.preventDefault()
            const response=await PostRequest("me/myquote",{content: data.content})
            setRedirect(true)
           
            
        }
    )

    return(
        redirect ? <Navigate to = {"/"}/> :
<form  onSubmit={Submit}>
        <div className='create-quote-container'>
            <div className='naslov-forme-quota'>
                <p className='crni-tekst-veliki-cq'>Are you felling</p>
                <p className='crveni-tekst-veliki-cq'>inspired?</p>
            </div>
            <div className='podnaslov-cq'>
                <p className='crni-tekst-cq'>You can post quotes. You can delete them on your profile.</p>
            </div>
            <textarea wrap='soft' className='input_area' {...register('content')} name="content" defaultValue=""/>
            <div className='submit-i-cancel-buttons'>
                <ButtonST content='Create' width='137px' bg='#DE8667'  fg='#FFFFFF'/>
                <ButtonST content='Cancel' bg='#FFFFFF'/>
            </div>
        </div>
        </form>
    )

}
export default CreateQuote;