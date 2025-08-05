import React, { useState } from 'react'
import HeroSection from '../component/Hero'
import Marquee from '../component/Example'
import FeaturesSectionDemo from '../component/Feature'
import Rendercard from '../component/Rendercard'
import Footer from '../component/Footer'
import ChatBot from '../component/Chatbot'
import Banner from '../component/Banner'
import Faq from '../component/Faq'
import Meta from '../component/SEO'
import { useEffect } from 'react'

const Home = () => {
    const [close, setClose] = useState(false)
    useEffect(()=>{
        setTimeout(() => {
        setClose(true)
    }, 10000);
    }, [])

  const [isLogin, setIsLogin] = useState(false)
          
  useEffect(()=>{
    setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
  },[])

  return (
    <div>
      <Meta
        title="ByteUP – Build Coding Culture & Connect Campus Talent"
        description="ByteUP is a coding culture platform helping students connect, collaborate, and grow."
        keywords="ByteUP, coding, campus, developers, events, challenges"
        url="https://www.byteup.online/"
        image="https://www.byteup.online/og-image.png"
      />
       <HeroSection/>
        <Marquee/>
        <FeaturesSectionDemo/>
        <Rendercard login={isLogin}/>
        <Faq/>
        <Footer/>
        <ChatBot/>
        {
            isLogin?'':close?<Banner handleClose={setClose}/>:''
        }
    </div>
  )
}

export default Home
