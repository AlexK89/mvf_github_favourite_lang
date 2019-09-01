import { getRequest } from './API'

export const getLimitForArray = arraySize => {
    switch (true) {
        case arraySize > 200:
            return Math.ceil(arraySize / 100 * 10)
        case arraySize > 100:
            return Math.ceil(arraySize / 100 * 20)
        case arraySize > 50:
            return Math.ceil(arraySize / 100 * 50)
        default:
            return arraySize
    }
}

export const fetchUserRepos = async ({ url, page = 1, reposPageLimit = 20 }) => {
    return await getRequest(`${url}?page=${page}&per_page=${reposPageLimit}`)
}

export const mostRepeatableValueInObject = ({ objectsArray, objectKey }) => {
    let mostRepeatableValueInObject = []

    if (objectsArray.length) {
        let counter = {}

        objectsArray.forEach(repo => {
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