import Link from "next/link"
import Logo from "./logos/Logo"

function FrontHero() {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto mt-32">
                <img src="/hero.png" alt="hero" className="w-1/3" />
                <div className='mr-10'>
                    <h1 className="text-5xl font-bold font-poppins">Donate & Get Rewarded!</h1>
                    <p className="py-6 font-poppins">
                        <span className="font-pacifico text-xl text-primary">Greengo </span> is a decentralized community-driven crowdfunding platform, with the main purpose of allowing innovators to raise capital for projects that could help achieve ONU Agenda's 2030, that is a global list of goals designed to be a <span className="italic">blueprint to achieve a better and more sustainable future for all</span>.</p>
                    <div className='flex space-x-4'>
                        <Link href="/projects">
                            <button className="btn btn-primary shadow-md">Explore</button>
                        </Link>
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="">
                            <p className="font-bold text-xl">37k+</p>
                            <p className="font-montserrat">Projects</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">20k+</p>
                            <p className="font-montserrat">Creators</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">99k+</p>
                            <p className="font-montserrat">Funds collected</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrontHero