import { useState } from 'react'
import { trpc } from '../utils/trpc';
import ProjectCard from '../components/ProjectCard';
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from '../components/SkeletonCard';
import type { Project } from "@prisma/client"

function ProjectsPage() {

    const [wordEntered, setWordEntered] = useState("");

    const { data: projects, isLoading } = trpc.useQuery(['project.all-projects'])

    const handleFilter = () => {
        const searchWord = wordEntered.toLowerCase();
        const newFilter = projects?.filter((project: Project) => {
            return project?.name.toLowerCase().startsWith(searchWord);
        });

        if (wordEntered === "") {
            return projects;
        } else {
            return newFilter;
        }
    }

    return (
        <div className='min-h-screen'>
            <div className='flex flex-col space-y-12 w-5/6 mx-auto'>
                {/* Title */}
                <p className='text-5xl font-semibold font-poppins pt-48'>Explore projects</p>
                {/* Search bar */}
                <input type="text" className="p-6 pl-8 h-8 rounded-xl bg-base-100 border shadow-lg outline-none placeholder:italic"
                    placeholder='Search a project...'
                    value={wordEntered}
                    onChange={(e) => {
                        setWordEntered(e.target.value);
                    }}
                />
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pb-10'>
                    {isLoading && <SkeletonCard cards={8} />}
                    {handleFilter()?.map((project) => (
                        <div key={project.id} >
                            <ProjectCard attributes={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectsPage