import Profile from '@/component/profile'
import Sidebar from '@/component/sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-2'>
            <Sidebar/>
        </div>
        <div className='col-span-10'>
            <Profile/>
        </div>
    </div>
  )
}

export default page