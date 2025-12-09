import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-[90%] mx-auto p-3  flex items-center justify-between mt-4 rounded'>
      <div>Jagora</div>
      <div className='flex justify-center items-center gap-2.5'>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="#">
          About Us
        </Link>
        <Link href="#">
          How it works
        </Link>

      </div>
      <div className='flex justify-center items-center gap-2.5'>
        <Link href="/dashboard" className='px-4 py-2 hover:shadow rounded'>
          Log in
        </Link>
        <Link className='text-white bg-indigo-600 tracking-tight px-4 py-2 rounded' href="#">
          See a Demo
        </Link>
      </div>
    </div>
  )
}
