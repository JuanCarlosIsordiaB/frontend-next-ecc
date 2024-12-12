import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {

  redirect('/store/1');
  return (
    <div>page</div>
  )
}

export default page