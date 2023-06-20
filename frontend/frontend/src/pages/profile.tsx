import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ImgST from '../components/ImgST';
import "../design/profile.css";
import avatar from '../assets/images/avatar.png'
import { Quote } from '../interfaces/Quote.interface';
import { Vote } from '../interfaces/Vote.interface';
import MostUpvoted, { ThreeColumnGrid } from '../layouts/most-upvoted-quotes';
import { Content } from './homepage';
import { ButtonST } from '../components/ButtonST';
const Profile = () => {
  const user = useSelector((state: any) => state?.user.value)
  const [limit, updateLimit] = useState(9)
  const [loading, setLoading] = useState(false)
  const [quotes, setQuotes] = useState([])
  const [recentquotes, setRecentQuotes] = useState([])



  const GetRecentQuotes = async () => {
    try {
      const res = await axios.get(`mostrecent/quotes?limit=${limit}`);
      
      setRecentQuotes(res.data);
      setLoading(true);
    }
    catch (err) {
      console.log(err);
    }
  }





  const GetQuotes = async () => {
    try {
      const res = await axios.get(`mostupvoted/quotes?limit=${limit}`);
      
      setQuotes(res.data);
      setLoading(true);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    GetQuotes();
    GetRecentQuotes();
  }, [limit]);
  return (
    <Content>

      <Orange />
      <ImgST width="100px" url={avatar} />
      <Name>{user?.first_name} {user?.last_name}</Name>
      <ScoreGrid>
        <div>Quotes
          <p><OrangeText>{user?.posts.length}</OrangeText></p>
        </div>
        <div>Quotastic Karma
          <p>32</p>
        </div>
      </ScoreGrid>
      <ThreeColumnGrid>
        <div>
          <ListHeading><OrangeText>Most liked quotes</OrangeText></ListHeading>
          {quotes.map((q: Partial<Quote>) => {
          if(q.user?.id==user.id )
            return (
               
              <MostUpvoted key={q?.id} user_id={q.user?.id} id={q.id || 0} img={user?.avatar} author={user?.first_name + " " + user?.last_name} content={q.content || ""} score={q.score || 0} />
            )
          })}
        </div>
        <div>
          <ListHeading>Most Recent</ListHeading>
          {recentquotes.map((q: Partial<Quote>) => {
            if(q.user?.id==user.id)
            return (
              <MostUpvoted key={q?.id} user_id={q.user?.id} id={q.id || 0} img={user?.avatar} author={user?.first_name + " " + user?.last_name} content={q.content || ""} score={q.score || 0} />
            )
          })}
        </div>
        <div>
          <ListHeading>Liked</ListHeading>
          {user?.votes.map((v: Vote) => {
            if (v.val)
              return (
                <MostUpvoted  user_id={v.post?.user?.id} vote='upvote' id={v.post?.id || 0} key={v.post?.id || 0} img={v.post?.user?.avatar} author={`${v.post?.user?.first_name} ${v.post?.user?.last_name}`} content={v.post?.content || ""} score={v.post?.score || 0} />
              )
          })}
        </div>
      </ThreeColumnGrid>
      <a onClick={()=>updateLimit(prevlimit=>prevlimit+3)} > <ButtonST  content='Show More' width='137px' border='#DE8667 1px solid' fg='#DE8667' bg='#FFFFFF' ></ButtonST></a>
     
    </Content>

  )
}
const ListHeading = styled.p`
    font-size: 24px;
    margin: 20px;
`
const OrangeText = styled.span`
    color: #DE8667;
`
const Name = styled.p`
    color: #fff;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 300;
    font-size: 35px !important;
`

const ScoreGrid = styled.div`
    width: 315px;
    height: 83px;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-columns: 1fr 1fr;
    & div{
      padding-top:10px;
      font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
/* identical to box height */


/* Dark */

color: #322D38;
       
        gap: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        & p {
          margin-top: -2px;
            font-size: 24px;
            font-weight: 300;
        }
    }
`

const Orange = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 414.5px;
    background-color: #DE8667;
    z-index: -1;
`

export default Profile