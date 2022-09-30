import type { NextPage } from "next";
import ProfileBody from "../components/profile/ProfileBody";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSideBar";
import { useState } from "react";

const ProfilePage: NextPage = () => {

    const [selectedTab, setSelectedTab] = useState("profile")

    return (
        <div className="grid grid-cols-3 p-10 w-4/5 mx-auto min-h-screen">
            <div className="col-span-1 mt-36">
                <ProfileSidebar setSelectedTab={setSelectedTab} />
            </div>
            {selectedTab === "profile" &&
                <div className="col-span-2 mt-36 bg-primary rounded-3xl shadow-xl">
                    <ProfileHeader />
                    <ProfileBody />
                </div>}
            {selectedTab === "create-project" &&
                <div className="col-span-2 mt-36 bg-primary rounded-3xl shadow-xl">
                    <h1 className="font-bold text-xl font-poppins p-4">Create Project</h1>
                </div>}
        </div>
    )
}

export default ProfilePage