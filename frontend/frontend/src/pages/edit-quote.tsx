import React, { useEffect, useState } from 'react';

import '../design/login.css'
import { ButtonST } from '../components/ButtonST';
import "../design/edit-quote.css";
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Quote } from '../interfaces/Quote.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { PostRequest } from '../services/PostRequest.service';
import { PostSchema } from '../validation/schemas/Post.schema';
import { PatchRequest } from '../services/PatchRequest.service';


function EditQuote(){
    const [redirect,setRedirect] = useState(false)
    const id = useParams().id
    const [onequote, setQuote] = useState<Quote | null>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        GetQuote();
      
      }, []);
    const GetQuote = async () => {
        try {
          const res = await axios.get(`quote/${id}`);
          console.log(res.data)
          setQuote(res.data);
          setLoading(true);
          
        }
        catch (err) {
          console.log(err);
        }
      }
      const {register,handleSubmit,formState: {errors}}=useForm<{content:string}>({
        resolver: yupResolver(PostSchema)
    })
    const UpdateQuote= handleSubmit(
        async (data,event)=> {
            event?.preventDefault()
            const response=await PatchRequest(`edit-quote/${id}`,{content: data.content})
            setRedirect(true)
           
           
            
        }
    )

    return(
      redirect ? <Navigate to = {"/edit-quote-confirm"}/> :
        <div className='create-quote-container'>
            <form onSubmit={UpdateQuote}>
            <div className='naslov-forme-quota'>
                <p className='crni-tekst-veliki-cq'>Edit your</p>
                <p className='crveni-tekst-veliki-cq'>quote?</p>
            </div>
            <textarea wrap="soft" className='input' {...register('content')} name="content" defaultValue={onequote?.content} ></textarea>
            <div className='submit-i-cancel-buttons'>
               <ButtonST content='Edit' width='137px' bg='#DE8667'  fg='#FFFFFF'/>
                <ButtonST content='Cancel' bg='#FFFFFF'/>
            </div>
            </form>
        </div>
    )

}
export default EditQuote;