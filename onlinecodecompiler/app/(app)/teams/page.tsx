import { Navbar } from '@/components/layout/Navbar1'
import { TeamSection } from '@/components/layout/sections/team'
import React from 'react'

export default function page() {
    return (
        <div className=''>
            <Navbar homepage={false} />
            <TeamSection />
        </div>
    )
}
