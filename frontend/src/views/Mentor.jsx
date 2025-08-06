import React from 'react'
import PlanSession from '../component/PlanSession'
import MemberViewCard from '../component/MemberViewCard'
import Member from './Member'

const Mentor = ({role, id}) => {
  return (
    <div >
      <div className=' w-full flex justify-center'>
        <PlanSession/>
      </div>

      <div className='flex w-full justify-center flex-wrap gap-10'>
        <Member id={id} role={role}/>
      </div>
    </div>
  )
}

export default Mentor
