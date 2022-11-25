import React from 'react'
import Logo from "./Logo"
import { ClockIcon } from "@heroicons/react/24/outline"
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline"
import { PhoneIcon } from "@heroicons/react/24/outline"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

const Sidebar = () => {
    return (
        <aside className='h-screen md:h-[100%]  md:rounded-l-[3rem] w-[20vw] md:w-[12vw] lg:min-w-[10vh]  flex flex-col bg-[#203990] items-center pt-10 transition-all relative '>
            <Logo />
            <br />
            <br />
            <div className='w-[55%] lg:w-[45%] h-24 md:h-28 rounded-[2rem] bg-white flex items-center justify-center drop-shadow-sm flex-col font-nunito font-medium'>
                <ClockIcon className='h-4 w-4 text-[#203990]' />
                <p className='text-xs text-[#203990] mt-1 '>Feed</p>
            </div>
            <br />
            <div className='w-[35%] flex items-center justify-center text-gray-300 font-nunito font-medium flex-col md:my-1 my-3'>
                <PhoneIcon className='h-4 w-4 ' />
                <p className='text-xs mt-1'>Dialer</p>
            </div>
            <br />
            <div className='w-[35%] flex  items-center justify-center text-gray-300 font-nunito font-medium flex-col md:my-1 my-3'>
                <ChatBubbleOvalLeftIcon className='h-4 w-4 ' />
                <p className='text-xs mt-1'>Message</p>
            </div>
            <br />
            <div className='w-[45%] h-14  flex  items-center justify-center shadow-sm rounded-t-full bg-[#ebc7e3]  bottom-0 absolute'>
                <Cog6ToothIcon className='h-4 w-4 text-[#203990]' />
            </div>
        </aside>
    )
}

export default Sidebar