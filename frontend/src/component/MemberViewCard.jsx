
import { useState, useEffect } from "react";
import SuccessAlert from "./Successalert";
import {Link} from 'react-router-dom'

export default function MemberViewCard({day,id, fetchData, fetchDataMentor, sessionId, click, role, time, loaction, specialization, detail, photo, phone, name, course, passout, linkedin, github}) {
    const [hide, setHide] = useState('')
    const [joined, setJoined] = useState(false)
    const [msg, setMsg] = useState('')
    console.log(sessionId, id)
    console.log(role)

    async function handleJoin() {
        setMsg("Joining")
        setHide('success')
        const res = await fetch(`https://byteup-ten.vercel.app/join/${sessionId}/${id}`,{
            method:"PATCH"
        })
        fetchData()
        setJoined(true)
        setHide('')
        
    }

    async function handleDelete() {
        if(confirm("Are you sure? you want to delete! "))
        setMsg("Deleting")
        setHide('success')
        const res = await fetch(`https://byteup-ten.vercel.app/delete-session/${sessionId}`,{
            method:"DELETE"
        })
        setHide('')
        fetchDataMentor()
    }
    

    return (
            <div className="bg-indigo-500/5 border border-gray-500/20  text-gray-500 flex flex-col items-center w-80 rounded-lg">
                {
                    hide === 'success'?<SuccessAlert text={msg} close={setHide}/>:''
                }
                <div className="flex items-center justify-between w-full px-4 py-2">
                    <div className="flex items-center justify-between gap-3">
                        <div className="bg-white p-1.5 rounded border border-gray-500/30">
                            <img className="w-20 h-20" src={photo} alt={name} />
                        </div>
                        <div className="text-base">
                            <p className=" text-gray-800">{name}</p>
                            <p className=" text-blue-800">{specialization}</p>
                            <p className=" text-amber-800">{course} &bull; {passout} Batch</p>
                            <div className="flex gap-2 underline text-blue-500">
                                <a target="_blank" href={linkedin}>Linkedin</a>
                                <a target="_blank" href={github}>Github</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col items-center gap-2 w-full p-4 pb-2 rounded-b-lg bg-white border-t border-gray-500/20">
                    <div className="flex items-center w-full ">
                        <p>&#9200; {day} &bull; {time}</p>
                    </div>
                    <div className="w-full h-px bg-gray-300/60"></div>
                    <div className="flex items-center w-full">
                        <p>📍 {loaction}</p>
                    </div>
                    <div className="w-full h-px bg-gray-300/60"></div>
                    <div className="flex items-center w-full">
                        <p>&#128222; {phone}</p>
                    </div>
                    <div className="w-full h-px bg-gray-300/60"></div>
                    <p>ⓘ {detail}</p>
                    <div className="w-full h-px bg-gray-300/60"></div>

                    <div className={` ${role === 'member'?'flex':'hidden'} ${click?'hidden':'flex'} flex-col w-full`}>
                    <span type="button" className={` ${joined?'flex':'hidden'} bg-green-700 text-white w-full justify-center items-center py-1 transition duration-200 `}>Joined</span>
                    <button onClick={handleJoin} type="button" className={`  bg-blue-500 text-white w-full justify-center items-center py-1 hover:bg-blue-700 transition duration-200 cursor-pointer`}>Join now</button>
                    </div>

                    <div className={` ${role === 'mentor' && click?'flex':'hidden'}  flex-col gap-2 w-full`}>
                    <Link  to={`/joiners/${sessionId}`} className={` bg-blue-500 flex text-white w-full justify-center items-center py-1 hover:bg-blue-700 transition duration-200 cursor-pointer `}>Joiners</Link>
                    <button onClick={handleDelete} type="button" className={` flex bg-red-500 text-white w-full justify-center items-center py-1 hover:bg-red-700 transition duration-200 cursor-pointer`}>Delete</button>
                    </div>
                    </div>
                </div>
    );
};