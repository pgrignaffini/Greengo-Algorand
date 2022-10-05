import ProjectInfoRow from "./ProjectInfoRow"

function ProjectInfo() {
    return (
        <div className='bg-white shadow-lg mx-auto rounded-lg p-5 w-full'>
            <p className="font-poppins font-bold text-2xl">Project Info</p>
            <div className="flex flex-col space-y-4 mt-8">
                <ProjectInfoRow />
                <ProjectInfoRow />
                <ProjectInfoRow />
                <ProjectInfoRow />
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Donate to this project:</span>
                    </label>
                    <label className="input-group">
                        <input type="text" placeholder="0.01" className="input input-bordered" />
                        <span>cUSD</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo