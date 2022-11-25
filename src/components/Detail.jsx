import React, { useContext, useMemo } from 'react'
import { ArchiveBoxIcon, ArrowLongRightIcon, ArrowRightCircleIcon, CalendarDaysIcon, ClockIcon, PhoneArrowDownLeftIcon, PhoneArrowUpRightIcon, SignalIcon, UserIcon, SignalSlashIcon,ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import { Avatar, IconButton } from '@mui/material'
import { ChevronLeftIcon, ChevronRightIcon, PhoneIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid"
import { CallsContext } from '../context/CallsContext'
import spinner from "../../public/spinner.gif";
import { isOutbound, getTime, isCallAnswered, getNextFeed, getPreviousFeed } from "../utils/logic";


const Detail = () => {


  const { calls, tabVal, detailLoading, callDetail, setCallDetail, markCallArchived, unarchiveCall, toggleDrawer, setToggleDrawer } = useContext(CallsContext);

  const callDirection = useMemo(() => {
    return isOutbound(callDetail?.direction)
  }, [callDetail])

  const callDate = useMemo(() => {
    return getTime(callDetail?.created_at)
  }, [callDetail])

  const callType = useMemo(() => {
    return isCallAnswered(callDetail?.call_type)
  }, [callDetail])

  const nextFeedIndex = getNextFeed(calls, callDetail)
  const previousFeedIndex = getPreviousFeed(calls, callDetail)


  return (
    <section className={`h-screen md:h-[90vh] lg:h-[80vh]  md:rounded-r-[3rem] bg-white w-[80vw] md:w-[50vw] ${!toggleDrawer ? "hidden" : null}  md:flex flex-col md:ml-[-42px] pl-6 pr-6 md:pl-20 md:pr-8 py-8 font-nunito relative transition-all`
    }>
      {/* Top bar  */}
      <section className='w-full flex items-center justify-between'>
        {toggleDrawer && <IconButton style={{ backgroundColor: '#eff1f7', marginRight:"14px" }} onClick={()=>setToggleDrawer(!toggleDrawer)}>
          <ArrowSmallRightIcon className='h-4 w-4 text-[#203990]'/>
        </IconButton>}
        <h2 className='font-nunito text-[#203990]  text-xl lg:text-2xl font-bold flex-grow'>Feed</h2>
        <div className='flex items-center space-x-2'>
          <p className='text-xs lg:text-sm text-gray-500'>Welcome user!</p>
          <IconButton style={{ backgroundColor: '#eff1f7' }}>
            <UserIcon className='h-3 w-3 lg:h-4 lg:w-4' />
          </IconButton>
        </div>
      </section>
      <br />
      {!callDetail?.id ? <div className='flex items-center flex-col font-nunito justify-center min-h-full -mt-3 flex-1  w-full '><img src="./noCalls.svg" alt="Feed not selected" className='w-64 h-40 ' /> <p className='text-xs lg:text-sm text-[#203990] font-light rounded-xl p-4 bg-[#f9f8ff] shadow-sm'>Select an item from the list to view details</p></div> :
        detailLoading ? <div className='flex items-center justify-center min-h-full -mt-5 flex-1  w-full '>
          <img src={spinner} alt="Loading..." className='h-12 w-12 lg:h-16 lg:w-h-16' />
        </div> :
          <>
            <section className='w-full font-nunito flex  items-center rounded-2xl space-x-4 shadow-sm py-6 px-4 my-2 bg-[#f9f8ff]'>
              {/* avatar  */}
              <Avatar alt={callDetail?.from?.slice(0).match(/[a-z]/i) || callDetail?.to?.slice(0).match(/[a-z]/i)} src='#' >
              </Avatar>
              {/* number details div  */}
              <div className='flex flex-col flex-1 min-w-min flex-wrap  justify-center'>
                <h3 className='font-extrabold text-base lg:text-xl text-[#203990] tracking-tight'>{!callDirection ? callDetail?.from : callDetail?.to ?? 'Voicemail'}</h3>
                <p className='text-xs tracking-tight lg:text-sm text-gray-500 font-medium'>{`Call ${callDirection ? "from" : "to"} ${callDirection ? callDetail?.from : callDetail?.to ?? 'Voicemail'} `}</p>
              </div>
              {/* icons */}
              <div className='flex items-center space-x-2'>
                <IconButton color='warning' aria-label='Archive conversation' onClick={() => markCallArchived(callDetail?.id)} disabled={callDetail?.is_archived} className="disabled:opacity-50" >
                  <ArchiveBoxIcon className='h-4 w-4 lg:h-5 lg:w-5' />
                </IconButton>
                {!callDetail?.is_archived ? <button className='h-8 lg:h-10 w-8 lg:w-10 bg-[#2a9e55] hover:opacity-90 rounded-full shadow-sm flex items-center justify-center text-center ' aria-label='Call'>
                  <PhoneIcon className='h-4 w-4' color='#fff' />
                </button> : <button className='h-8 w-8 lg:h-10  lg:w-10 bg-red-500 hover:opacity-90 rounded-full shadow-sm flex items-center justify-center text-center disabled:opacity-50 ' aria-label='Call' onClick={() => unarchiveCall(callDetail?.id)} disabled={!callDetail?.is_archived}>
                  <ArchiveBoxXMarkIcon className='h-4 w-4' color='#fff' />
                </button>}
              </div>
            </section>

            {/* call details explanation section  */}
            <section className='flex flex-col items-center font-nunito text-gray-600 text-xs w-full py-2 ' aria-label='More details'>
              <div className='flex items-center justify-start w-full mb-4 text-[13px] border-dashed border-t-2 pt-5 border-[#203990] ' >
                <PhoneArrowUpRightIcon className='h-[.85rem] w-[.85rem]  mr-1' />
                <p className=' mr-3'>{callDetail?.from}</p>
                <ArrowLongRightIcon className='h-4 w-4 text-[#2a9e55] ' />
                <ArrowLongRightIcon className='h-4 w-4  text-[#2a9e55]' />
                <ArrowLongRightIcon className='h-4 w-4 text-[#2a9e55] mr-3' />
                <PhoneArrowDownLeftIcon className='h-[.85rem] w-[.85rem] mr-1' />
                <p className='text-xs'>{callDetail?.to ?? 'Voicemail'}</p>
              </div>
              <div className='flex items-center justify-start w-full  mb-1.5 '>
                <CalendarDaysIcon className='h-4 w-4 mr-3 text-[#203990]' />
                <p>{callDate}</p>
              </div>
              <div className='flex items-center w-full justify-start  mb-1.5 '>
                <ArrowRightCircleIcon className='h-4 w-4 mr-3 text-[#203990] ' />
                <p className='capitalize'>{callDetail?.direction} call</p>
              </div>
              <div className='flex items-center w-full justify-start mb-1.5 '>
                <ClockIcon className='h-4 w-4 mr-3 text-[#203990]' />
                <p>{callDetail?.duration} seconds</p>
              </div>
              <div className='flex items-center w-full justify-start mb-1.5 '>
                {callType ? <SignalIcon className='h-4 w-4 mr-3 text-[#203990]' /> : <SignalSlashIcon className='h-4 w-4 mr-3 text-[#203990]' />}
                <p className='capitalize'>{callDetail?.call_type}</p>
              </div>
            </section>

            {/* navigation arrows  */}
            {tabVal === 0 && !toggleDrawer && <div className='flex items-center space-x-3 p-3 rounded-2xl  absolute bottom-4 left-[55%] transform translate-x-[-55%] bg-[#f9f8ff] shadow-sm '>
              <IconButton disabled={calls[0]?.id === callDetail?.id} className="disabled:opacity-50" onClick={() => setCallDetail(calls[previousFeedIndex])}  >
                <ChevronLeftIcon className='h-3 w-3 lg:h-4 lg:w-4  text-[#203990] font-bold ' />
              </IconButton>
              <IconButton disabled={calls[calls?.length - 1]?.id === callDetail?.id} className="disabled:opacity-50" onClick={() => setCallDetail(calls[nextFeedIndex])}>
                <ChevronRightIcon className='h-3 w-3 lg:h-4 lg:w-4 text-[#203990] font-bold' />
              </IconButton>
            </div>}
          </>
      }

    </section>
  )
}

export default Detail