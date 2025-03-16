"use client"
import { Navbar } from '@/components/layout/Navbar1';
import { ContactSection } from '@/components/layout/sections/contact'
import React from 'react'

export default function page() {
  return (
    <div className=''>
        <Navbar homepage={false}  />
        <ContactSection />
    </div>
  )
}
