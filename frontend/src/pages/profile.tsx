import type { NextPage } from "next";
import ProfileBody from "../components/profile/ProfileBody";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSideBar";
import { useState } from "react";
import CreateProject from "../components/profile/CreateProject";

const ProfilePage: NextPage = () => {

    const [selectedTab, setSelectedTab] = useState("profile")

    return (
        <div className="grid grid-cols-3 p-10 w-4/5 mx-auto min-h-screen">
            <div className="col-span-1 mt-36">
                <ProfileSidebar setSelectedTab={setSelectedTab} />
            </div>
            {selectedTab === "profile" &&
                <div className="col-span-2 mt-36 bg-secondary rounded-3xl shadow-xl">
                    <ProfileHeader />
                    <ProfileBody />
                </div>}
            {selectedTab === "create-project" &&
                <div className="col-span-2 mt-36 bg-base-100 border-2 border-secondary rounded-3xl shadow-xl">
                    <CreateProject />
                </div>}
        </div>
    )
}

export default ProfilePage