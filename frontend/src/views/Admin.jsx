import React from 'react'
import { useState, useEffect } from 'react'
import AdminCard from '../component/AdminCard'
import Loading from '../component/Loading'

const Admin = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [click, setClick] = useState(false)

    async function fetchData(verified) {
      setLoading(true)
        const res = await fetch(`https://byteup-ten.vercel.app/getadmin/${verified}`, {
         method:'GET'
         })
        const data = await res.json();
         console.log(data)
         const shuffle = (array) => {
          const shuffled = [...array];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        };
        const shuffleData = shuffle(data)
        setData(shuffleData)
        setLoading(false)
        }

    useEffect( ()=>{
        fetchData(false)
    }, [])

    async function handleFetch() {
      setClick(click?false:true)

      if(click){
        fetchData(false)
      }
      else{
        fetchData(true)
      }
    }

     if(loading){
            return(
            <div className='flex w-screen  justify-center items-center'><Loading/></div>
        )
    }

  return (
    <div className="min-h-screen w-full bg-gray-50">
        <div className="flex gap-4 justify-center items-center py-6">
        <button
        onClick={handleFetch}
          className={`${
            !click ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'
          } px-6 py-2 font-semibold rounded-full transition-all duration-200`}
        >
          Pending
        </button>
        <button
        onClick={handleFetch}
          className={`${
            click ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'
          } px-6 py-2 font-semibold rounded-full transition-all duration-200`}
        >
          Aprooved
        </button>
      </div>
     <div className="flex lg:px-32 justify-center overflow-y-scroll max-h-screen flex-wrap gap-10 w-full py-10">

      
      {
        data.map((item)=>(
            <AdminCard key={item._id} role={item.role} verified={item.verified}
            name={item.name} email={item.email} phone={item.phone}
            specialization={item.specialization} course={item.course} passout={item.passout}
            photo={item.photo} about={item.about} linkedin={item.linkedin}
            github={item.github} id={item._id}
            />
        ))
      }
      
    </div>
    </div>
  )
}

export default Admin
