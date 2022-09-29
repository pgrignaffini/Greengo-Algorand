import { useState } from "react"
import { useRouter } from "next/router"
import { SearchIcon } from "@heroicons/react/outline"
export default function SearchBar({ placeholder }: { placeholder: string }) {

    const [address, setAddress] = useState<string>("")
    const router = useRouter()

    return (
        <div className="bg-transparent rounded-md">
            <div className="inline-flex flex-col flex-start justify-center relative text-base-100">
                <div className="flex items-center">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        setAddress("")
                        router.push(`/profile/${address}`)
                    }}>
                        <input type="text" className="p-5 pl-8 h-8 rounded-md  text-primary placeholder:text-primary placeholder:italic bg-transparent border shadow-xl outline-none"
                            placeholder={placeholder}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </form>
                    <SearchIcon className="w-4 h-4 absolute left-2.5 text-primary" />
                </div>
            </div>
        </div>
    )
}