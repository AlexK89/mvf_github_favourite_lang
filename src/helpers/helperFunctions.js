import { getRequest } from './API'

export const fetchUserRepos = async ({ url, page = 1, reposPageLimit = 20 }) => {
    return await getRequest(`${url}?page=${page}&per_page=${reposPageLimit}`)
}

export const mostRepeatableValueInObject = languagesArrayOfObjects => {
    const filterLanguages = languagesArrayOfObjects.filter(language => language.primaryLanguage)
    const languagesArray = filterLanguages.map(language => language.primaryLanguage.name)
    let mostRepeatableValueInObject = []

    if (languagesArray.length) {
        let counter = {}

        languagesArray.forEach(repo => {
            counter[repo] ?
                counter[repo] += 1 :
                counter[repo] = 1
        })

        mostRepeatableValueInObject = Object.keys(counter).filter(element => {
            return counter[element] === Math.max(...Object.values(counter))
        })
    }

    return mostRepeatableValueInObject
}