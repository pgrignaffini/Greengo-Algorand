import React from 'react'
import featuredProjects from '../../../data/featuredProjects.json'
import ProfileProjectCard from './ProfileProjectCard'

function ProfileBody() {
    return (
        <div className="mt-4 bg-base-100 rounded-3xl z-0">
            <h1 className="font-bold text-xl font-poppins p-4">Projects believed in:</h1>
            <div className="carousel carousel-center p-4 space-x-8 bg-transparent ">
                {featuredProjects?.data?.map((project: any, index: number) => (
                    <div className="carousel-item" key={index}>
                        <div className="flex flex-col">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={project?.attributes?.image} alt="carousel-item" />
                                </div>
                            </div>
                            <p className="text-center w-24 font-poppins truncate">{project?.attributes?.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="font-bold text-xl font-poppins p-4">Latest projects:</h1>
            <div className='p-5 flex flex-col space-y-5 overflow-y-scroll scrollbar-hide'>
                <ProfileProjectCard banner='/banner1.webp' category='forest' />
                <ProfileProjectCard banner='/banner2.webp' category='ocean' />
                <ProfileProjectCard banner='/banner3.webp' category='climate' />
            </div>
        </div>
    )
}

export default ProfileBody