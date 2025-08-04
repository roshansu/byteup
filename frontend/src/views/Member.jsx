import React from 'react'
import MemberViewCard from '../component/MemberViewCard'
import Loading from '../component/Loading'
import { useState, useEffect } from 'react'

const Member = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(()=>{
        async function fetchData() {
            const res = await fetch('https://byteup-ten.vercel.app/getsession',{
            method:'GET'
        })
        const data = await res.json();
        console.log(data)
        setData(data)
        setLoading(false)
        }
        fetchData()
    }, [])

    if(loading){
        return(
        <div className='flex w-screen  justify-center items-center'><Loading/></div>
    )
    }

  return (
    <div className="flex lg:px-32 justify-center overflow-y-scroll max-h-screen flex-wrap gap-10 w-full py-10">
      {
        data.map((item)=>(
            <MemberViewCard key={item._id}
             day={item.day} time={item.time} user={item.user}
             loaction={item.location} detail={item.detail} />
        ))
      }
    </div>
  )
}

export default Member
