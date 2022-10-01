
function ProjectBanner({ banner, logo }: { banner?: string, logo: string }) {
    return (
        <>
            <img src={banner ?? "/blank.png"} alt="project_banner" className="w-full inset-x-0 h-96 object-cover" />
            <div className="avatar flex -top-24 items-center justify-center">
                <div className="w-48 z-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img src={logo ?? "/blank.png"} alt="project_logo" />
                </div>
            </div>
        </>
    )
}

export default ProjectBanner
