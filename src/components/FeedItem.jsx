import React, { useContext, useMemo } from 'react'
import { PhoneArrowDownLeftIcon, PhoneArrowUpRightIcon, PhoneXMarkIcon } from "@heroicons/react/24/outline";
import { isCallAnswered, isOutbound, getTime, getCurrentFeed } from "../utils/logic";
import { CallsContext } from '../context/CallsContext';


const FeedItem = ({ callItem }) => {

  const { calls, archivedCalls, tabVal, callDetail, setCallDetail, setToggleDrawer, toggleDrawer } = useContext(CallsContext);

  const callType = useMemo(() => {
    return isCallAnswered(callItem?.call_type)
  }, [callItem])

  const callDirection = useMemo(() => {
    return isOutbound(callItem?.direction)
  }, [callItem])

  const callDate = useMemo(() => {
    return getTime(callItem?.created_at)
  }, [callItem])

  function handleSelectFeed(feeds, id) {
    if (tabVal === 0) {
      const index = getCurrentFeed(feeds, id)
      setCallDetail(calls[index])
    }
    if (tabVal === 1) {
      const index = getCurrentFeed(feeds, id)
      setCallDetail(archivedCalls[index])
    }
    if (window.innerWidth < 768) {
      setToggleDrawer(!toggleDrawer)
    }
  }

  return (
    <div className={`w-full space-x-4 lg:space-x-5 pl-4 md:pl-3 lg:pl-4 pr-4 py-4 rounded-l-3xl flex items-center font-nunito ${callDetail?.id === callItem?.id ? "bg-white pointer-events-none" : null} cursor-pointer hover:bg-white`} onClick={() => handleSelectFeed(tabVal === 0 ? calls : archivedCalls, callItem?.id)}>
      {!callType ? <PhoneXMarkIcon className='h-4 w-4 text-[#ed525f]' /> : null}
      {callType && callDirection ? <PhoneArrowUpRightIcon className='h-4 w-4 text-gray-500' /> : null}
      {callType && !callDirection ? <PhoneArrowDownLeftIcon className='h-4 w-4 text-gray-500' /> : null}
      <div className='flex flex-1 flex-col justify-center min-w-fit  '>
        <h3 className='font-bold text-[#203990] text-base md:text-sm lg:text-base'>{callItem?.to ?? "Voicemail"}</h3>
        <p className={`lg:text-[11px] text-[10px] ${callType ? 'text-gray-500' : 'text-[#ed525f]'} font-medium capitalize`}>{callItem?.call_type} via {callItem?.via}</p>
      </div>
      <p className='text-[10px] text-gray-500 font-medium max-w-[4.3rem]'>{callDate}</p>

    </div>
  )
}

export default FeedItem