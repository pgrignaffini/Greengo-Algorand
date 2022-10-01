import React from 'react'
import Instagram from "../logos/Instagram"
import Facebook from "../logos/Facebook"
import { useSession } from "next-auth/react"

function ProfileHeader() {

    const { data: session } = useSession()

    return (
        <div className='p-5'>
            <div className='flex space-x-4 items-center'>
                <img src={session?.user?.image as string} className="w-24 rounded-full" />
                <div className='flex flex-col'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl font-bold font-poppins'>{session?.user?.name as string}</h1>
                        <div className='w-12 cursor-pointer'><Instagram /></div>
                        <div className='w-12 cursor-pointer'><Facebook /></div>
                    </div>
                    {/* <p className='font-montserrat'>Writer Indie</p> */}
                </div>
            </div>
            <div className='flex justify-evenly space-x-5 mt-10'>
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-2xl'>102</h1>
                    <p className='font-montserrat'>Donations</p>
                </div>
                <div className='divider-horizontal' />
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-2xl'>14</h1>
                    <p className='font-montserrat'>Projects created</p>
                </div>
                <div className='divider-horizontal' />
                <div className='flex flex-col items-center'>
                    <h1 className='font-bold text-2xl'>102</h1>
                    <p className='font-montserrat'>Donations</p>
                </div>

            </div>
        </div>
    )
}

export default ProfileHeader