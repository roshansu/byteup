import { useState } from "react";
import ErrorAlert from "../component/Erroralert";
import WaitAlert from "../component/Waitalert";
import { useNavigate } from "react-router-dom";
import PageNotFOund from "./PageNotFound";

export default function AdminLogin({isLogin}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState('')
    const navigate = useNavigate()

    if(isLogin)
        return(<PageNotFOund/>)

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(email && password){
            setHide('process')
            const res = await fetch('https://byteup-ten.vercel.app/adminlogin',{
                headers:{
                    "Content-type": 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await res.json();
            setHide(data.success?'success':'error')
                if(data.success){
                    const userData = {
                    id: data.id,
                    role: data.role,
                    isLogin: true
                };

            localStorage.setItem('isLogin', JSON.stringify(userData.isLogin));
            localStorage.setItem('role', userData.role);
            localStorage.setItem('id', userData.id);
            navigate('/dashboard')
        }
        }
        else
        return alert('all fields are required')
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="bg-white border text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
               { hide === 'process'?<WaitAlert/>:''}
               { hide === 'success'?<SuccessAlert close={setHide} text={"Login success"} />:''}
               { hide === 'error'?<ErrorAlert close={setHide} text={"Invalid email or password or you are not approved by our team!"} />:''}
               
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin login</h2>
        
            <input value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Userid" required />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" required />
        
            <button type="submit" className={` ${hide?'hidden':'block'} w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium`}>Login</button>
            
        </form>
        </div>
    );
};