import { useState, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useForm } from 'react-hook-form';
import { create } from 'ipfs-http-client';
import { GlobeAltIcon, PencilIcon, XCircleIcon } from "@heroicons/react/outline"
import Discord from "../logos/Discord"
import Twitter from "../logos/Twitter"
import toast from "react-hot-toast"
import { trpc } from "../../utils/trpc";

function CreateProject() {

    const [logo, setLogo] = useState("")
    const [banner, setBanner] = useState("")
    const [name, setName] = useState("")
    const [bannerToIpfs, setBannerToIpfs] = useState("")
    const [logoToIpfs, setLogoToIpfs] = useState("")
    const imagePickerRef = useRef(null)
    const bannerPickerRef = useRef(null)

    const createProject = trpc.useMutation("project.create-project")

    const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID
    const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET
    const projectIdAndSecret = `${projectId}:${projectSecret}`

    const ipfsClient = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
                'base64'
            )}`,
        },
    })

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const addImageToBanner = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setBanner(readerEvent?.target?.result as string);
        };
        setBannerToIpfs(e.target.files[0])
    }

    const addImageToLogo = (e: any) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setLogo(readerEvent?.target?.result as string);
        };
        setLogoToIpfs(e.target.files[0])
    }

    const removeBanner = () => {
        setBanner("")
        setBannerToIpfs("")
    }

    const removeLogo = () => {
        setLogo("")
        setLogoToIpfs("")
    }

    const onSubmit = handleSubmit(async (data) => {

        toast.loading("Creating new project...", {
            id: "project-toast",
        })

        try {

            let bannerUrl = ''
            let logoUrl = ''

            if (bannerToIpfs) {
                const added = await ipfsClient.add(bannerToIpfs)
                console.log(added)
                bannerUrl = `https://greengo.infura-ipfs.io/ipfs/${added.path}`
            }

            if (logoToIpfs) {
                const added = await ipfsClient.add(bannerToIpfs)
                console.log(added)
                logoUrl = `https://greengo.infura-ipfs.io/ipfs/${added.path}`
            }

            createProject.mutate({
                name: data.name,
                email: data.email,
                image: logoUrl,
                banner: bannerUrl,
                description: data.description,
                website: data.website,
                twitter: data.twitter,
                discord: data.discord,
                start: data.start,
                end: data.end,
                goal: data.goal,
            });


            toast.success("Project created!", {
                id: "project-toast",
            })
        } catch (error) {
            toast.error("Whoops! Something went wrong.", {
                id: "project-toast",
            })
        }

        setValue("name", "")
        setValue("email", "")
        setValue("description", "")
        setValue("website", "")
        setValue("twitter", "")
        setValue("discord", "")
        setValue("start", "")
        setValue("end", "")
        setValue("goal", "")
        setLogo("")
        setBanner("")
        setLogoToIpfs("")
        setBannerToIpfs("")
    })


    return (
        <div className=''>
            <div className="bg-base-100 rounded-xl border-2 h-64 w-3/4 mx-auto mt-6 shadow-xl cursor-pointer">
                <div className='relative h-3/4'>
                    <div className='w-full h-full rounded-t-xl'>
                        {banner ?
                            <>
                                <XCircleIcon className='absolute top-2 right-2 w-6 h-6 text-red-500 cursor-pointer' onClick={removeBanner} />
                                <img className='w-full h-full rounded-t-xl object-cover' src={banner} alt="banner" />
                            </> :
                            <button className='w-full h-full rounded-xl hover:bg-gray-300'
                                onClick={() => (bannerPickerRef as any).current?.click()}
                            >
                                <PencilIcon className='mx-auto w-12 h-12' />
                                <input ref={bannerPickerRef} onChange={addImageToBanner} type="file" hidden />
                            </button>}
                    </div>
                    <div className='flex space-x-6 absolute -bottom-8 left-12  '>
                        <div className='rounded-xl w-16 h-16 object-cover ring ring-secondary ring-offset-base-100 ring-offset-4'>
                            {logo ?
                                <>
                                    <XCircleIcon className='absolute -top-2 right-2 w-6 h-6 text-red-500 cursor-pointer' onClick={removeLogo} />
                                    <img className='rounded-xl' src={logo} alt="logo" />
                                </> :
                                <button className='w-full h-full rounded-xl hover:bg-gray-300'
                                    onClick={() => (imagePickerRef as any).current?.click()}
                                >
                                    <PencilIcon className='mx-auto w-8 h-8' />
                                    <input ref={imagePickerRef} onChange={addImageToLogo} type="file" hidden />
                                </button>}
                        </div>
                        <p className='font-poppins text-xl font-semibold uppercase text-center text-wrap mt-16'>{name}</p>
                    </div>
                </div>
            </div>
            <h1 className='font-bold font-poppins text-2xl text-center mt-10'>Fill project details:</h1>
            <form onSubmit={onSubmit} className='p-5'>
                <div className='flex flex-col space-y-4 mt-10'>
                    <input
                        {...register('name', { required: true })}
                        className='border-b-2 border-base-200 bg-base-100 p-2 outline-none placeholder:italic' type="text" placeholder="Project Name*" onChange={(e) => setName(e.target.value)} />
                    <textarea
                        {...register('description', { required: true })}
                        className='border-b-2 border-base-200 bg-base-100 p-2 outline-none placeholder:italic' placeholder="Project Description*" />
                    <div className="form-control mx-auto">
                        <label className="input-group">
                            <span>Goal*</span>
                            <input
                                {...register('goal', { required: true })}
                                type="text" placeholder="10" className="input input-bordered" />
                            <span>cUSD</span>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Start</label>
                            <input id="start"
                                {...register('start', { required: true })}
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                type="datetime-local" />
                        </div>
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">End</label>
                            <input id="end"
                                {...register('end', { required: true })}
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                type="datetime-local" />
                        </div>
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <GlobeAltIcon className='h-6 w-6 text-secondary' />
                        <input
                            {...register('website', { required: false })}
                            className='border-b-2 flex-1 border-base-200 bg-base-100 p-2 outline-none placeholder:italic' type="text" placeholder="Project Website" />
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <div className='w-6 h-6'>
                            <Discord />
                        </div>
                        <input
                            {...register('discord', { required: false })}
                            className='border-b-2 flex-1 border-base-200 bg-base-100 p-2 outline-none placeholder:italic' type="text" placeholder="Project Discord" />
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <div className='w-6 h-6'>
                            <Twitter />
                        </div>
                        <input
                            {...register('twitter', { required: false })}
                            className='border-b-2 flex-1 border-base-200 bg-base-100 p-2 outline-none placeholder:italic' type="text" placeholder="Project Twitter" />
                    </div>
                </div>
                {Object.keys(errors).length > 0 && (
                    <div className='space-y-2 p-2 text-error'>
                        {errors.name?.type === 'required' && (
                            <p>- A project name is required</p>
                        )}
                        {errors.description?.type === 'required' && (
                            <p>- A project description is required</p>
                        )}
                    </div>
                )}
            </form >
        </div >
    )
}

export default CreateProject