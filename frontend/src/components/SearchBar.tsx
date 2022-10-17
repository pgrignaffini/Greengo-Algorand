import { useState } from "react"
import Link from "next/link"
import { trpc } from '../utils/trpc';
import { Project } from "@prisma/client"
export default function SearchBar({ placeholder }: { placeholder: string }) {

    const [wordEntered, setWordEntered] = useState("");

    const { data: projects } = trpc.useQuery(['project.search-project', {
        name: wordEntered
    }], {
        enabled: wordEntered.length > 0
    })

    return (
        <div className="rounded-md outline-none">
            <div className="inline-flex flex-col flex-start justify-center relative text-inherit">
                <div className="grid">
                    <input type="text" className="p-2 pl-8 border-b-2 border-gray-300 outline-none bg-transparent text-inherit placeholder:italic"
                        value={wordEntered}
                        placeholder={placeholder}
                        onChange={(e) => setWordEntered(e.target.value)} />
                    <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {projects && (
                    <ul className="bg-base-100 max-h-80 shadow-xl rounded-md absolute z-10 w-full top-12 overflow-hidden overflow-y-auto scrollbar-hide">
                        {projects?.slice(0, 15).map((project: Project, index: number) => {
                            return (
                                <Link key={index} href={{
                                    pathname: `/project/${project.id}`,
                                }}>
                                    <li onClick={() => setWordEntered("")} className="flex flex-row justify-between items-center p-1 border-b-2 relative cursor-pointer hover:bg-[#d3ffd8] hover:text-gray-900">
                                        <img alt="profil" src={project.image || "/blank.png"}
                                            className="h-12 w-12 object-cover rounded-full" />
                                        <a >
                                            <p className="font-montserrat text-sm">{project.name}</p>
                                        </a>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}