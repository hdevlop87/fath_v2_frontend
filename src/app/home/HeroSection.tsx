'use client'
import React from 'react'
import hero1 from '@/assets/slide.png'
import Image from 'next/image'

const Hero = () => {
   return (
      <div className='flex  flex-col  lg:gap-20 mt-24'>
         <div className='grid grid-cols-12 gap-4 '>
            <div className='flex  justify-center col-span-12 lg:col-span-7 mt-4'>
               <Image src={hero1} className='lg:w-full' alt='logo' />
            </div>
         </div>
      </div>
   )
}

export default Hero