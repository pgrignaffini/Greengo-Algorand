import { useState } from 'react'
import { Waveform } from '@uiball/loaders'

function ProjectBanner({ banner, logo }: { banner?: string, logo: string }) {

    const [bannerLoading, setBannerLoading] = useState(true)
    const [logoLoading, setLogoLoading] = useState(true)

    return (
        <div className='mt-24'>
            {bannerLoading && <div className='flex justify-center items-center w-full h-96'><Waveform /></div>}
            <img src={banner ?? "/blank.png"} className={`w-full inset-x-0 h-96 object-cover ${bannerLoading && "hidden"}`} onLoad={() => { setBannerLoading(false) }} />
            <div className="avatar flex -top-24 items-center justify-center">
                <div className="w-48 z-10 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-4">
                    {logoLoading && <div className='h-full flex justify-center items-center'><Waveform /></div>}
                    <img src={logo ?? "/blank.png"} onLoad={() => setLogoLoading(false)} />
                </div>
            </div>
        </div>
    )
}

export default ProjectBanner
