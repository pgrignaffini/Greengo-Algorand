import React from 'react'

function ProjectInfoRow() {
    return (
        <div className='collapse border border-primary rounded-xl'>
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-white  text-primary-content peer-checked:bg-base-100 peer-checked:text-secondary-content">
                <p className='font-montserrat'>Info</p>
            </div>
            <div className="collapse-content bg-white text-primary-content peer-checked:bg-base-100 peer-checked:text-secondary-content">
                <p className='font-montserrat'>Answer</p>
            </div>
        </div>
    )
}

export default ProjectInfoRow