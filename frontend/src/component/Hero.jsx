import { useState, useEffect } from 'react';
import HeroButton from './HeroButton';
import { Link } from 'react-router-dom';

function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState('')
  const [id, setId] = useState('')
          
  useEffect(()=>{
    setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
    setRole(localStorage.getItem('role'))
    setId(localStorage.getItem('id'))
  },[])


  return (
    <section className="pb-32 md:pb-44 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat text-slate-800 text-sm">
      <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 border-b border-white/25 w-full">
        <h1 className='text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent'>
          ByteUP
        </h1>

        <Link to={'/admin-login'} className={` ${isLogin?'hidden':'block'} px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-full`}>
          Admin
        </Link>
      </nav>

      {/* Main Content Section */}
      <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-32">
        {/* Text Content */}
        <div className="max-md:text-center">
          <h1 className="text-4xl md:text-5xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
            Shaping Coding Culture at Shobhit University
          </h1>
          <p className="text-sm md:text-lg max-w-lg mt-6 max-md:px-2 text-slate-600">
            We are actively building and maintaining a strong coding culture at Shobhit University through mentorship, collaboration, and peer-to-peer learning
          </p>

          <div className={` ${isLogin?'hidden':'flex'} items-center gap-4 mt-6 justify-center md:justify-start`}>
            <Link to={'/register'} className="px-8 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all">
              Register
            </Link>
            <Link to={'/login'} className="px-5 py-3 rounded-md bg-white text-indigo-600 border border-indigo-400 flex items-center gap-2 hover:bg-indigo-600/5 active:scale-95 transition-all">
              <span>📚</span>
              <span>Login</span>
            </Link>
          </div>

          <div className={` ${isLogin?'flex':'hidden'} items-center gap-4 mt-6 justify-center md:justify-start`}>
              <HeroButton
              text={role === 'member'?'View sessions':role === 'mentor'?'Plan session':role === 'admin'?'View requests':''}
              />
          </div>

          {/* <div className="flex items-center mt-9 justify-center md:justify-start">
            <div className="flex -space-x-3.5 pr-3">
              {[1,2,3,4,5].map((_, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 30}.jpg`}
                  alt="user"
                  className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[${i + 1}]"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-px text-yellow-500">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-sm text-slate-500">Used by 1,000+ people</p>
            </div>
          </div> */}
        </div>

        {/* Image Section */}
        <div className="w-full md:max-w-xs lg:max-w-lg">
          <img className="w-full h-auto" src="https://raw.githubusercontent.com/roshansu/static-image/refs/heads/main/users-group.png" alt="User group" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
