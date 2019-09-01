export const mostRepeatableValueInObject = (objectsArray, objectKey, limit) => {
    // Because we want to make best guess, we don't want to fetch all repos
    // and waste resources/loading time I think it's enough to fetch 
    // last X numbers of repos. I will take page limit.
    let mostRepeatableValueInObject = []
    
    if (objectsArray.length) {
        const slicedArray = objectsArray.slice(0, limit)

        let counter = {}
    
        slicedArray.forEach(repo => {
            const key = repo[objectKey]
            if (key) {
                counter[key] ?
                counter[key] += 1 :
                counter[key] = 1
            }
        })
    
        mostRepeatableValueInObject = Object.keys(counter).filter(element => {
            return counter[element] === Math.max(...Object.values(counter))
        })
    } 

    return mostRepeatableValueInObject
}