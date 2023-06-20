import styled from "styled-components";
import orangeupvote from '../assets/images/upvoteorange.png'
import orangedownvote from '../assets/images/downvoteorange.png'
import editquote from '../assets/images/edit-quote.png'
import deletequote from '../assets/images/delete-quote.png'
import ImgST from "../components/ImgST";
import avatar from '../assets/images/avatar.png'
import axios from "axios";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isFunctionTypeNode } from "typescript";
import React from "react";
interface Props{
    content: string,
    author: string,
    score: number,
    vote?: string,
    key?:number,
    user_id?:number,
    id: number,
    renderdelete?:boolean,

    img?: string,
 
    auth?: boolean,

}



  

const MostUpvoted: React.FC<Props> = ({user_id,id,content, score, author, vote,renderdelete}) => {    
    const user = useSelector((state: any) => state?.user.value)
    const forceUpdate = React.useCallback(() => updateState({}), []);
      const Likequote = async (id:number) => {
       if(user_id===user.id){
        alert("You are not able to like your qoute")
       }else return axios.post(`${id}/upvote`);
        
      }
      const Dislikequote = async (id:number) => {
        if(user_id===user.id){
            alert("You are not able to dislike your qoute")
           }else 
           {
          
            return axios.post(`${id}/downvote`);
           }
      }
     
    
  return (
    <Card>
        <div>
            <Vote color={vote} className='vote' onClick={()=>Likequote(id)} src={orangeupvote} alt="upvote" />
            <p>{score} </p>
            <Vote color={vote} className='vote' onClick={()=>Dislikequote(id)}  src={orangedownvote} alt="downvote" />
        </div>
        <div>
            <div>
                <QuoteContent>{content}</QuoteContent>
                <p ><ImgST url={avatar} width="40px"/><NavLink onClick={()=>forceUpdate()} to={`/profile-page/${user_id}`}>{author}</NavLink></p>
            </div>
        </div>
       
        {
            renderdelete ? <div>
            <NavLink to={`deletequote/${id}`}><Vote1 color="#DE8667" className='deletequote'  src={deletequote} alt="delete" /></NavLink>
            
            <NavLink to={`myquote/${id}`}><Vote1 color="#DE8667" className='editquote'  src={editquote} alt="edit" /></NavLink>
        </div> : <></>
        }
        
    </Card>
    
  )
}

const QuoteContent= styled.p`
font-family: 'Raleway';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;

color: #000000;
`

export const ThreeColumnGrid = styled.div`
  margin-top: 2.25rem;
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.25rem;
  @media screen and (max-width: 661px) {
    grid-template-columns: 1fr;
    max-width: 83vw;
  }
  @media screen and (min-width: 662px) and (max-width: 1120px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`
const Card = styled.div`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    gap: 21px;
    width: 420px;
    height: 101px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 16px 32px 16px 16px;
    & div{
        display: flex;
        flex-direction: column;
       
        align-items: center;
        justify-content: center;
        & div {
            display: flex;
            align-items: baseline;
            gap: 5px;
            & :nth-child(2) {
                font-size: 12px;
            }
            & img, p{
                max-width: 323px;
                overflow-wrap: break-word;
                margin-right: 8px;
                vertical-align: middle;
            }
            
        }
    }
`

const Vote = styled.img`
    filter: ${props => props.color === props.alt ? "brightness(100%)" : "brightness(0%)"};
    &:hover{
        filter: ${props => props.color === props.alt ? "brightness(0%)" : "brightness(100%)"};
    }
`
const Vote1 = styled.img`
 
        filter: ${props => props.color === props.alt ? "brightness(0%)" : "brightness(100%)"};

`

export default MostUpvoted;

function updateState(arg0: {}): any {
    throw new Error("Function not implemented.");
}
