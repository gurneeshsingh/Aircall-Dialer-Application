import { createContext, useState } from "react";


export const CallsContext = createContext();
const baseUrl = "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app"

export function CallsContextProvider({ children }) {

    const [calls, setCalls] = useState([]);
    const [tabVal, setTabVal] = useState(0);
    const [archivedCalls, setArchivedCalls] = useState([]);
    const [feedLoading, setFeedLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [error, setError] = useState(false);
    const [callDetail, setCallDetail] = useState({})
    const [toggleDrawer, setToggleDrawer] = useState(false);

    async function fetchCallsData(url) {
        setFeedLoading(true)
        try {
            const response = await fetch(url);
            const data = await response.json()
            let allCalls;
            let archivedCalls;
            if (data) {
                allCalls = data.filter((feed) => !feed.is_archived)
                archivedCalls = data.filter((feed) => feed.is_archived)
            }
            setCalls(allCalls)
            setArchivedCalls(archivedCalls)
        } catch (error) {
            setError(true)
        }
        setFeedLoading(false)
    };

    async function fetchCallDetail(id) {
        setDetailLoading(true)
        try {
            const response = await fetch(`${baseUrl}/activities/${id}`);
            const data = await response.json()
            data && setCallDetail(data)
        } catch (error) {
            setError(true)
        }
        setDetailLoading(false)
    }

    async function markCallArchived(id) {
        try {
            const response = await fetch(`${baseUrl}/activities/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_archived: true })
            });
            // const data = await response.json()
             fetchCallDetail(id)
             fetchCallsData(`${baseUrl}/activities`)

        } catch (error) {
            setError(true)
        }
    };
    async function unarchiveCall(id) {
        try {
            const response = await fetch(`${baseUrl}/activities/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_archived: false })
            });
            // const data = await response.json()
            fetchCallDetail(id)
            fetchCallsData(`${baseUrl}/activities`)


        } catch (error) {
            setError(true)
        }
    };

    const value = {
        calls,
        tabVal,
        setTabVal,
        archivedCalls,
        feedLoading,
        detailLoading,
        error,
        callDetail,
        setCallDetail,
        fetchCallsData,
        fetchCallDetail,
        markCallArchived,
        unarchiveCall,
        toggleDrawer,
        setToggleDrawer
    }


    return (
        <CallsContext.Provider value={value}>
            {children}
        </CallsContext.Provider>
    )
}

