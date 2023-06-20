import React from 'react'
import Footer from './footer'
import Navbar from './navbar'
import Container from '../components/Containter'

interface Props{
    children: React.ReactNode
}
const Wrapper = (props: Props) => {

  return (
    <>
    <Navbar/>
    <Container>{props.children}</Container>
    
    
    <Footer/>
    
    </>
  )
}

export default Wrapper