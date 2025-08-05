import React, { useRef, useState, useEffect } from 'react';
import MentorCard from './MentorCard'; 
import './rendercard.css'
import TeamMemberCard from './Teamcard';
import MemberCard from './MemberCard';
import Loading from './Loading';

const Rendercard = ({login}) => {
  const mentorRef = useRef();
  const memberRef = useRef();
  const adminRef = useRef();
  const [loading, setLoading] = useState(true)
  const [memberData, setMemberData] = useState([])
  const [mentorData, setMentorData] = useState([])
  const [adminData, setAdminData] = useState([])


useEffect(() => {
  async function fetchData() {
    const res = await fetch('https://byteup-ten.vercel.app/getdata');
    const data = await res.json();
    setLoading(false);

    // Fisher-Yates Shuffle
    const shuffle = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const member = shuffle(data.filter((item) => item.role === 'member'));
    console.log('member', member);
    setMemberData(member);

    const mentor = shuffle(data.filter((item) => item.role === 'mentor'));
    console.log('mentor', mentor);
    setMentorData(mentor);

    const admin = data.filter((item) => item.otpVerified === true);
    console.log('admin', admin);
    setAdminData(admin);
  }

  fetchData();
}, []);

  const scroll = (ref, direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  if(loading){
    return(
      <div className='flex justify-center items-center'><Loading/></div>
    )
  }

  return (
    <div className="relative px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-32">

      {/* === MENTORS Section === */}
      <h1 className="text-3xl font-bold mb-5">Our mentors</h1>
      <div className="mb-10 relative">
        {/* Scroll Buttons */}
        <div className="absolute top-0 right-0 flex gap-2 z-10">
          <button
            onClick={() => scroll(mentorRef, 'left')}
            className="bg-gray-300 text-black hover:bg-gray-400 rounded px-2 py-1 text-sm shadow"
          >
            ←
          </button>
          <button
            onClick={() => scroll(mentorRef, 'right')}
            className="bg-gray-800 text-white hover:bg-black rounded px-2 py-1 text-sm shadow"
          >
            →
          </button>
        </div>

        {/* Cards */}
        <div
          ref={mentorRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pt-5 lg:pt-10"
        >
          {
          mentorData.map((item) => (
            <MentorCard login={login}
              key={item._id}
              phone={item.phone}
              name={item.name}
              photo={item.photo}
              course={item.course}
              passout={item.passout}
              specialization={item.specialization}
              linkedin={item.linkedin}
              github={item.github}
              about={item.about}
            />
          ))
      } 

        </div>
      </div>

      {/* === MEMBERS Section === */}
      <h1 className="text-3xl font-bold mb-5">Members</h1>
      <div className="mb-10 relative">
        {/* Scroll Buttons */}
        <div className="absolute top-0 right-0 flex gap-2 z-10">
          <button
            onClick={() => scroll(memberRef, 'left')}
            className="bg-gray-300 text-black hover:bg-gray-400 rounded px-2 py-1 text-sm shadow"
          >
            ←
          </button>
          <button
            onClick={() => scroll(memberRef, 'right')}
            className="bg-gray-800 text-white hover:bg-black rounded px-2 py-1 text-sm shadow"
          >
            →
          </button>
        </div>

        {/* Cards */}
        <div
          ref={memberRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pt-5 lg:pt-10"
        >
          {
            memberData.map((item)=>(
              <MemberCard key={item._id} login={login} phone={item.phone}
                name={item.name} photo={item.photo} course={item.course}
                passout={item.passout} linkedin={item.linkedin} github={item.github}
                specialization={item.specialization}
              />
            ))
          }
        </div>
      </div>
      <div className='flex justify-center mb-8'>
          <h1 className="text-3xl md:text-4xl   font-semibold  text-gray-800">Meet Our Team</h1>
      </div>
      <div className="mb-10 relative">
        {/* Scroll Buttons */}
        <div className="absolute top-0 right-0 flex gap-2 z-10">
          <button
            onClick={() => scroll(adminRef, 'left')}
            className="bg-gray-300 text-black hover:bg-gray-400 rounded px-2 py-1 text-sm shadow"
          >
            ←
          </button>
          <button
            onClick={() => scroll(adminRef, 'right')}
            className="bg-gray-800 text-white hover:bg-black rounded px-2 py-1 text-sm shadow"
          >
            →
          </button>
        </div>

        {/* Cards */}
        <div
          ref={adminRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pt-5 lg:pt-10"
        >
        {
            adminData.map((item)=>(
              <TeamMemberCard
                key={item._id} name={item.name} photo={item.photo}  login={login}
                role={item.phone === "8434822338"?"Founder":"Admin"} phone={item.phone}
                linkedin={item.linkedin} github={item.github} about={item.about}
              />
            ))
          }

        </div>
      </div>      
    </div>
  );
};

export default Rendercard;
