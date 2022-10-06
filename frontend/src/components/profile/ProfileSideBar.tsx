import { BellIcon, PlusCircleIcon, UserCircleIcon, MailIcon, CollectionIcon, HeartIcon } from '@heroicons/react/outline'
import ProfileSidebarRow from './ProfileSidebarRow';

function ProfileSidebar({ setSelectedTab }: { setSelectedTab: any }) {

    return (
        <div className='flex flex-col col-span-2 items-center mt-5 px-4 md:items-start'>
            <ProfileSidebarRow Icon={UserCircleIcon} title="Profile" onClick={() => setSelectedTab("profile")} />
            <ProfileSidebarRow Icon={BellIcon} title="Notifications" />
            <ProfileSidebarRow Icon={MailIcon} title="Messages" />
            <ProfileSidebarRow Icon={HeartIcon} title="Liked" onClick={() => setSelectedTab("liked")} />
            <ProfileSidebarRow Icon={PlusCircleIcon} title="Create project" onClick={() => setSelectedTab("create-project")} />
            <ProfileSidebarRow Icon={CollectionIcon} title="Your projects" onClick={() => setSelectedTab("your-projects")} />
        </div>
    )
}

export default ProfileSidebar