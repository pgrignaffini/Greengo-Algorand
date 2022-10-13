import type { NextPage } from "next";
import ProfileSidebar from "../components/profile/ProfileSideBar";
import { useState } from "react";
import CreateProject from "../components/profile/CreateProject";
import YourProjects from "../components/profile/YourProjects";
import LikedProjects from "../components/profile/LikedProjects";
import ProfileCard from "../components/profile/ProfileCard";

const ProfilePage: NextPage = () => {

    const [selectedTab, setSelectedTab] = useState("profile")

    return (
        <div className="grid grid-cols-3 p-10 w-4/5 mx-auto min-h-screen">
            <div className="col-span-1 mt-36">
                <ProfileSidebar setSelectedTab={setSelectedTab} />
            </div>
            {selectedTab === "profile" &&
                <div className="col-span-2 mt-36 bg-secondary h-fit rounded-3xl shadow-xl">
                    <ProfileCard />
                </div>}
            {selectedTab === "create-project" &&
                <div className="col-span-2 mt-36 bg-base-100 border-2 border-secondary rounded-3xl shadow-xl">
                    <CreateProject />
                </div>}
            {selectedTab === "your-projects" &&
                <div className="col-span-2 mt-36">
                    <YourProjects />
                </div>}
            {selectedTab === "liked" &&
                <div className="col-span-2 mt-36">
                    <LikedProjects />
                </div>}
        </div>
    )
}

export default ProfilePage