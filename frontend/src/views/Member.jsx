import React from 'react'
import MemberViewCard from '../component/MemberViewCard'
import Loading from '../component/Loading'
import { useState, useEffect } from 'react'

const Member = ({role, id}) => {
  console.log("member card", role, id)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [click, setClick] = useState(false)

    async function fetchData() {
      console.log("fetching session for member")
      setLoading(true)
            const res = await fetch(`https://byteup-ten.vercel.app/getsession/${id}`,{
            method:'GET'
        })
        const data = await res.json();
        console.log(data)
        setData(data)
        setLoading(false)
        }

        async function fetchDataMember() {
          setLoading(true)
            const res = await fetch(`https://byteup-ten.vercel.app/getsession-member/${id}`,{
            method:'GET'
        })
        const data = await res.json();
        console.log(data)
        setData(data)
        setLoading(false)
        }

         async function fetchDataMentor() {
          console.log("fetching session for mentor")
          setLoading(true)
            const res = await fetch(`https://byteup-ten.vercel.app/getsession-mentor/${id}`,{
            method:'GET'
        })
        const data = await res.json();
        console.log(data)
        setData(data)
        setLoading(false)
        }
        

    useEffect(()=>{
        
        fetchData()
    }, [])

    async function handleClickMentor() {
      setClick(click?false:true)
      if(role === 'member')
      {
        if(click){
          fetchData();
        } else{
            fetchDataMember()
        }

      }
      else if(role === 'mentor'){
        if(click){
          console.log("all session")
          fetchData();
        } else{
          console.log("mentor session")
            fetchDataMentor()
        }
      }
      else{
        return
      }
    }

    if(loading){
        return(
        <div className='flex w-screen  justify-center items-center'><Loading/></div>
    )
    }

  return (
    <div>
      <div className=' px-2 flex py-4 gap-10'>
        <button onClick={handleClickMentor} className={` ${click?'bg-gray-400 text-black':'bg-green-600 text-white'} cursor-pointer px-4 py-2 transition-all duration-200 text-white font-medium rounded-xl `}>All</button>
        <button onClick={handleClickMentor} className={` ${click?'bg-green-600 text-white':'bg-gray-400 text-black'} cursor-pointer px-4 py-2 transition-all duration-200 text-white font-medium rounded-xl `}>{ role==="mentor"?"My Session":"Joined"}</button>
      </div>
      <div className="flex lg:px-32 justify-center overflow-y-scroll max-h-screen flex-wrap gap-10 w-full py-10">
      {data.length>0?
        data.map((item)=>(
            <MemberViewCard key={item._id} id={id} sessionId={item._id} role={role}
            fetchData={fetchData} fetchDataMentor={fetchDataMentor}
             day={item.day} time={item.time} loaction={item.location} click={click}
              detail={item.detail} name={item.user.name} course={item.user.course}
              passout={item.user.passout} photo={item.user.photo} specialization={item.user.specialization}
              linkedin={item.user.linkedin} github={item.user.github} phone={item.user.phone} />
        ))
      :'No sessions' }
    </div>
    </div>
  )
}

export default Member
