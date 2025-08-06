// import Loading from '../component/Loading'
// import JoinerProfile from '../component/JoinerProfile'
// import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
// import { useState, useEffect } from 'react'

// const Joiner = () => {
//     const {id} = useParams()
//     const [loading, setLoading] = useState(true)
//     const [data, setData] = useState([])

//     async function fetchData() {
//         const res = await fetch(`http://localhost:5000/get-joiners/${id}`,{
//             method:"GET"
//         })
        
//         setData(await res.json())
//         console.log(data)
//         setLoading(false)
//     }

//     useEffect(()=>{
//         fetchData()
//     },[])

//       if(loading){
//             return(
//             <div className='flex w-screen  justify-center items-center'><Loading/></div>
//         )
//         }
//   return (
//     <div>
//         <p className='text-center text-lg lg:text-2xl text-black mt-2 font-medium'>Participants</p>
//         <Link to={'/dashboard'} type='button' className='px-6 fixed top-4 right-4 py-2 font-medium text-white bg-blue-600 rounded-xl'>Back</Link>
//     <div className='flex lg:px-32 gap-10 py-16 justify-center flex-wrap p-4'>
//       {
//         data.length>0?
//         data.map((item)=>(
//             <JoinerProfile key={item._id}
//                 name={item.name} course={item.course} passout={item.passout} specialization={item.specialization}
//                 phone={item.phone} photo={item.photo} linkedin={item.linkedin} github={item.github}
//             />
//         ))
//         :'No data found!'
//       }
//     </div>
//     </div>
//   )
// }

// export default Joiner


import Loading from '../component/Loading';
import JoinerProfile from '../component/JoinerProfile';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Joiner = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch(`http://localhost:5000/get-joiners/${id}`, {
        method: 'GET',
      });

      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch joiners:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-10 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
          Participants
        </h2>
        <Link
          to="/dashboard"
          className="px-5 py-2 text-sm md:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          Back
        </Link>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {data.length > 0 ? (
          data.map((item) => (
            <JoinerProfile
              key={item._id}
              name={item.name}
              course={item.course}
              passout={item.passout}
              specialization={item.specialization}
              phone={item.phone}
              photo={item.photo}
              linkedin={item.linkedin}
              github={item.github}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No joiners found!</p>
        )}
      </div>
    </div>
  );
};

export default Joiner;
