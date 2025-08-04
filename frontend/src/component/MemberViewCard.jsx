import Button from "./Button";
import { useState, useEffect } from "react";

export default function MemberViewCard({day, time, loaction, detail, user}) {
     const [data, setData] = useState([])

     useEffect(()=>{
        async function fetchData() {
            const res = await fetch(`https://byteup-ten.vercel.app/sessionuser?id=${user}`,{
            method:'GET',
        })
        const data = await res.json();
        console.log(data)
        setData(data);
        }
        fetchData();
     }, [])

    return (
            <div className="bg-indigo-500/5 border border-gray-500/20  text-gray-500 flex flex-col items-center w-80 rounded-lg">
                <div className="flex items-center justify-between w-full px-4 py-2">
                    <div className="flex items-center justify-between gap-3">
                        <div className="bg-white p-1.5 rounded border border-gray-500/30">
                            <img className="w-20 h-20" src={data.photo} alt={data.name} />
                        </div>
                        <div className="text-base">
                            <p className=" text-gray-800">{data.name}</p>
                            <p className=" text-blue-800">{data.specialization}</p>
                            <p className=" text-amber-800">{data.course} &bull; {data.passout} Batch</p>
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
                        <p>&#128222; {data.phone}</p>
                    </div>
                    <div className="w-full h-px bg-gray-300/60"></div>
                    <p>ⓘ {detail}</p>
                </div>
                </div>
    );
};