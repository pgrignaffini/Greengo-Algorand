import React from 'react'
import ProjectCard from './ProjectCard'
import featuredProjects from '../../data/featuredProjects.json'

function ProjectsCollection() {
    return (
        <>
            {featuredProjects?.data?.map((project: any, index: number) => (
                <ProjectCard key={index} attributes={project.attributes} />
            ))}
        </>
    )
}

export default ProjectsCollection