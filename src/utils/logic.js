export function isCallAnswered(callType) {
    return callType === 'answered' ? true : false
}

export function isOutbound(callDirection) {
    return callDirection === 'outbound' ? true : false
}

export function getTime(createdAt) {
    const completeDate = new Date(createdAt).toUTCString();
    return `${completeDate.slice(0,12)}${new Date(createdAt).toLocaleTimeString()}`
}

export function getNextFeed(feeds, currentFeed) {
    const currentIndex = feeds?.findIndex((feed) => feed.id === currentFeed?.id)
    return currentIndex + 1;
}
export function getPreviousFeed(feeds, currentFeed) {
    const currentIndex = feeds?.findIndex((feed) => feed.id === currentFeed?.id)
    return currentIndex > 0 ? currentIndex -1 : null;
}

export function getCurrentFeed(feeds, id) {
    const index = feeds?.findIndex((feed) => feed.id === id)
    return index;
}