// import { useState } from "react";
// import SuccessAlert from "./Successalert";

// export default function PlanSession() {
//     const [open, setOpen] = useState(false)
//     const [day, setDay] = useState('Everyday')
//     const [time, setTime] = useState('')
//     const [location, setLocation] = useState('')
//     const [detail, setDetail] = useState('')
//     const [hide, setHide] = useState('')
//     const user = localStorage.getItem('id')

//     async function handleSubmit(e) {
//         e.preventDefault()
//         if(day && time && location && detail){
//             setOpen(false)
//             setHide('success')
//             const res = await fetch('https://byteup-ten.vercel.app/newsession',{
//                 headers: {
//                 "Content-Type": "application/json",
//             },
//             method: "POST",
//             body: JSON.stringify({
//                 day,
//                 time,
//                 location,
//                 detail,
//                 user,
//             })
//             })
//             setHide('')
//         }
//     }


//     return (
//        <div >
//             { hide === 'success'?<SuccessAlert close={setHide} text={"Session planned"} />:''}
//         <div onClick={()=>setOpen(open?false:true)} className="text-lg mt-4 text-white bg-blue-500 hover:bg-blue-700 cursor-pointer transition duration-200 font-medium rounded-xl py-2 px-4 flex items-center justify-center">
//             Plan a new session
//         </div>

//          <form onSubmit={handleSubmit} className={` ${open?'flex':'hidden'} flex-col items-center text-sm text-slate-800`}>
//             <h1 className="text-4xl font-bold py-4 text-center">Plan a new session.</h1>
            
//             <div className="max-w-96 w-full px-4">
//                 <label htmlFor="day" className="font-medium">Session day</label>
//                 <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
//                     <select required={true} onChange={(e)=>setDay(e.target.value)} name="day" id="">
//                         <option selected={true} value="Everyday">Everyday</option>
//                         <option value="Every Monday">Every Monday</option>
//                         <option value="Every Tuesday">Every Tuesday</option>
//                         <option value="Every Wednesday">Every Wednesday</option>
//                         <option value="Every Thursday">Every Thursday</option>
//                         <option value="Every Friday">Every Friday</option>
//                         <option value="Every Saturday">Every Saturday</option>
//                         <option value="Every Sunday">Every Sunday</option>
//                     </select>
//                 </div>

//                 <label htmlFor="time" className="font-medium">Session time</label>
//                 <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
//                     <input type="time" onChange={(e)=>setTime(e.target.value)} name="time" className="h-full px-2 w-full outline-none bg-transparent" placeholder="" required />
//                 </div>
        
//                 <label htmlFor="email-address" className="font-medium mt-4">Enter location. ex:- nmc building, computer lab etc</label>
//                 <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
//                     <input onChange={(e)=>setLocation(e.target.value)} type="text"  name="location" className="h-full px-2 w-full outline-none bg-transparent" placeholder="Describe your location ex:- NMC building/computer lab" required />
//                 </div>
        
//                 <label htmlFor="message" className="font-medium mt-4">Describe your session </label>
//                 <textarea rows="4" onChange={(e)=>setDetail(e.target.value)} name="about" className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all" placeholder="Which topic you will cover in this session?" required></textarea>
                
//                 <button type="submit" className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition">
//                     Submit
//                     <svg className="mt-0.5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
//                     </svg>
//                 </button>
//             </div>
//         </form>
//        </div>
//     );
// };

import { useState } from "react";
import SuccessAlert from "./Successalert";

export default function PlanSession() {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState("Everyday");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const [hide, setHide] = useState("");
  const user = localStorage.getItem("id");

  async function handleSubmit(e) {
    e.preventDefault();
    if (day && time && location && detail) {
      setHide("success");
      setOpen(false);
      await fetch("https://byteup-ten.vercel.app/newsession", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          day,
          time,
          location,
          detail,
          user,
        }),
      });
      setHide("");
    }
  }

  return (
    <div className="relative">
      {/* Success Alert */}
      {hide === "success" && <SuccessAlert close={setHide} text="Session planned" />}

      {/* Plan Button */}
      <div
        onClick={() => setOpen(true)}
        className="text-lg mt-6 mx-auto text-center w-fit text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition duration-200 font-medium rounded-full py-2 px-6"
      >
        Plan a new session
      </div>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
          {/* Modal */}
          <div className="bg-white w-full max-w-md sm:max-w-lg rounded-xl shadow-lg p-6 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-6">
              Plan a New Session
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {/* Day */}
              <div>
                <label className="block font-medium mb-1">Session Day</label>
                <select
                  required
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                >
                  <option value="Everyday">Everyday</option>
                  <option value="Every Monday">Every Monday</option>
                  <option value="Every Tuesday">Every Tuesday</option>
                  <option value="Every Wednesday">Every Wednesday</option>
                  <option value="Every Thursday">Every Thursday</option>
                  <option value="Every Friday">Every Friday</option>
                  <option value="Every Saturday">Every Saturday</option>
                  <option value="Every Sunday">Every Sunday</option>
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="block font-medium mb-1">Session Time</label>
                <input
                  type="time"
                  required
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-slate-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  required
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., NMC Building, Computer Lab"
                  className="w-full border border-slate-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Detail */}
              <div>
                <label className="block font-medium mb-1">Session Details</label>
                <textarea
                  rows="3"
                  required
                  onChange={(e) => setDetail(e.target.value)}
                  placeholder="What will you cover in this session?"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-indigo-400 outline-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-full transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tailwind Animation (only Tailwind classes) */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
