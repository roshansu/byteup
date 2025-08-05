import { useState, useEffect } from "react";
import PageNotFOund from "./PageNotFound";
import Memeber from '../views/Member'
import Admin from "../views/Admin";
import Mentor from "../views/Mentor";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [sidebar, setSideBar] = useState('dashboard')

    const [isLogin, setIsLogin] = useState(null)
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const navigate = useNavigate()
        
        useEffect(()=>{
            setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
            setRole(localStorage.getItem('role'))
            setId(localStorage.getItem('id'))
        },[]) 
        if (isLogin === null) {
            return <div className="flex justify-center py-4">Loading...</div>; // or your custom <Loading />
        }
        if (!isLogin) {
             return(<PageNotFOund/>)
        }
    function logOut(){
        if(!confirm("Are you sure logout?"))
            return
    localStorage.clear();
    navigate('/')
  }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to={'/'} className='text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent'>
                    ByteUP
                </Link>
                 <h3 className='text-lg lg:text-2xl font-bold bg-gradient-to-r from-stone-500 to-stone-700 bg-clip-text text-transparent'>
                    {role === 'member'?'Join upcoming session':role === 'mentor'?'Plan or view session':role === 'admin'?'review request':''}
                </h3>
                <div className="flex items-center gap-5 text-gray-500">
                    <Link to={'/profile'} className={` ${role === 'admin'?'hidden':'block'} border rounded-full text-sm px-4 py-1`}>Profile</Link>
                    <button onClick={logOut} className={` ${role === 'admin'?'flex':'hidden'} px-4 justify-center content-center py-3 text-white bg-blue-600 rounded-xl`}>Logout</button>
                </div>
            </div>
            <div className="flex">
            
            <div >
                {
                    role === 'member'?<Memeber/>: role === 'mentor'?<Mentor/>:role === 'admin'?<Admin/>:''
                }
            </div>
            </div>
        </>
    );
};

export default Dashboard