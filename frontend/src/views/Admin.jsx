import React from 'react'
import { useState, useEffect } from 'react'
import AdminCard from '../component/AdminCard'
import Loading from '../component/Loading'

const Admin = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    async function fetchData() {
        const res = await fetch('http://localhost:5000/getadmin', {
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
            <AdminCard key={item._id} role={item.role} verified={item.verified}
            name={item.name} email={item.email} phone={item.phone}
            specialization={item.specialization} course={item.course} passout={item.passout}
            photo={item.photo} about={item.about} linkedin={item.linkedin}
            github={item.github} id={item._id}
            />
        ))
      }
      
    </div>
  )
}

export default Admin
