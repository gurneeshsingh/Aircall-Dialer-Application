import { useContext, useEffect } from "react"
import Detail from "./components/Detail"
import Feed from "./components/Feed"
import Sidebar from "./components/Sidebar"
import { CallsContext } from "./context/CallsContext"


function App() {

  const baseUrl = import.meta.env.VITE_FEED || 'https://aircall-job.herokuapp.com/'


  const { fetchCallsData } = useContext(CallsContext)

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && fetchCallsData(`${baseUrl}activities`)
    return () => isSubscribed = false;
  }, [])


  return (

    <main className="w-full md:w-[90%] lg:w-[75%] h-screen md:h-[90vh] lg:h-[80vh] md:mx-auto md:my-[5vh] lg:my-[10vh]  flex md:rounded-[3rem] shadow-md transition-all">
      <Sidebar />
      <Feed />
      <Detail />
    </main>


  )
}

export default App
