import { useState } from "react";
import MemberCard from "./MemberCard";
import MentorCard from './MentorCard'

export default function AdminCard({name, email, role, verified, phone, specialization, course, passout, photo, about, linkedin, github, id}) {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('')

    const handleApprove = async () =>{
        if(!confirm("Are you sure you want to approve"))
        {
            return
        }
        setOpen(true)
        setStatus('Approved')
        alert('Approved')

        await fetch('https://byteup-ten.vercel.app/approve',{
          headers: {
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                id: id,
                verified: true
            })
        })
    }


    return (
        <div className="flex flex-wrap h-fit justify-center gap-6">
            <div className="text-sm text-gray-500 w-80 divide-y divide-gray-500/30 border border-gray-500/30 rounded bg-white">
                <div className="flex transition duration-200 cursor-pointer items-start justify-between p-3">
                    <div>
                        <h2 className="text-lg text-gray-800">{name}</h2>
                        <p className="bg-amber-500/20 w-fit mb-1 px-2 py-0.5 rounded-full text-xs text-amber-600 border border-amber-500/30">{role}</p>
                        <p className="text-blue-500">{specialization}</p>
                        <p className="text-black">{course} &bull; {passout} batch</p>
                        <div className="py-1 text-gray-700">
                            <p>{email}</p>
                            <p>{phone}</p>
                        </div>
                        <p>{about}</p>
                        <div className="flex underline text-blue-700 gap-4 py-1">
                            <a href={linkedin} target="_blank">Linkedin</a>
                            <a href={github} target="_blank">Github</a>
                        </div>
                    </div>
                    <img className="h-18 w-18 rounded-full" src={photo} alt="userImage1" />
                </div>
                <div className={` ${ verified?'hidden':open?'hidden':'flex'} items-center divide-x divide-gray-500/30`}>
                    <button onClick={handleApprove} type="button" className={`flex cursor-pointer bg-red-200 hover:bg-red-300 transition duration-200 items-center justify-center gap-2 w-full py-3`}>
                       Approve
                    </button>
                </div>
                <div className={`${ verified?'flex':open?'flex':'hidden'} bg-green-200 text-green-500 py-3 justify-center items-center `}>
                        Approved
                </div>
            </div>
        
        </div>
    );
};