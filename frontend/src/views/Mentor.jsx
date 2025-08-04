import React from 'react'
import PlanSession from '../component/PlanSession'
import MemberViewCard from '../component/MemberViewCard'
import Member from './Member'

const Mentor = () => {
  return (
    <div>
      <div className=' flex justify-center'>
        <PlanSession/>
      </div>

      <div className='flex justify-center flex-wrap gap-10'>
        <Member/>
      </div>
    </div>
  )
}

export default Mentor
