import React, { useContext} from 'react'
import { STabs, STab } from "./StyledTabs";
import { IconButton } from '@mui/material';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import FeedItem from './FeedItem';
import { CallsContext } from '../context/CallsContext';
import spinner from "../../public/spinner.gif"

const Feed = () => {

  
  const { calls, archivedCalls, feedLoading,tabVal, setTabVal, toggleDrawer } = useContext(CallsContext)


  function handleTabChange(event, newValue) {
    setTabVal(newValue)
  }

  return (
    <section className={`h-screen md:h-[90vh] lg:h-[80vh] md:rounded-r-[3rem] bg-[#f9f8ff] w-[80vw] md:w-[35vw]  ${toggleDrawer ? "hidden" : "flex"} flex-col z-20  pl-5 md:pl-5 lg:pl-7 pt-8 pb-4 shadow-sm shadow-slate-200 transition-all `}>
      <div className='w-[90%]  flex items-center justify-between '>
        <STabs value={tabVal} onChange={handleTabChange} className="bg-[#eff1f7] max-w-min rounded-full shadow-sm ">
          <STab label={`All  (${calls?.length})`} />
          <STab label={`Archived  (${archivedCalls?.length})`} />
        </STabs>
        <IconButton aria-label="search" style={{ backgroundColor: '#eff1f7' }} >
          <MagnifyingGlassIcon className='h-5 w-5' color='#203990' />
        </IconButton>
      </div>
      <br />
      {feedLoading ? <div className='flex items-center justify-center h-full flex-1 -mt-20 w-full'>
        <img src={spinner} alt="Loading..." className='h-16 w-h-16' />
      </div>
        : <div className='w-full h-full overflow-y-auto flex-1 scrollbar-hide transition-all '>
          {/* all calls  */}
          {calls?.length > 0 && tabVal === 0 && calls?.map((call) => (
            <FeedItem key={call.id} callItem={call} />
          ))}
          {calls?.length === 0 && tabVal === 0 && <div className='w-full h-full min-h-full flex flex-col items-center justify-center flex-1 -ml-5'>
            <img src="./empty.svg" alt="No conversations" className='w-40 h-w-40 flex-1' />
            <button className='rounded-full px-4 py-3 bg-[#203990] hover:opacity-90 transition-all text-white font-nunito text-xs shadow-sm' onClick={()=>setTabVal(1)}>Archived</button>
          </div>}
          {/* archived calls  */}
          {archivedCalls?.length > 0 && tabVal === 1 && archivedCalls?.map((call) => (
            <FeedItem key={call.id} callItem={call} />))}
          {archivedCalls?.length === 0 && tabVal === 1 && <div className='w-full h-full min-h-full flex flex-col items-center justify-center flex-1'>
            <img src="./archive.svg" alt="No archived conversations" className='w-48 h-w-48 flex-1' />
            <button className='rounded-full px-4 py-3 bg-[#203990] hover:opacity-90 transition-all text-white font-nunito text-xs shadow-sm' onClick={()=>setTabVal(0)}>All conversations</button>
          </div>}

        </div>
      }

    </section>
  )
}

export default Feed