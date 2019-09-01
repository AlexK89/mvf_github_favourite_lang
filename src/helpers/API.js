import { token } from './secretToken'
export const baseURL = 'https://api.github.com/users'

// All API calls can be rebuild to GraphQL besides repo list(platform limitation)
export const fetchLanguages = async userName => {
    // For `first` we use 100 as it is limitation of Github
    const graphQuery = {
        query: `query {
                    user(login: ${userName}) {
                        repositories(first: 100) {
                            nodes {
                                primaryLanguage {
                                    name
                                }
                            }
                        }
                     }
                }`
    }

    return await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            "Authorization": `bearer ${token}`
        },
        body: JSON.stringify(graphQuery)
    })
        .then(response => response.json())
        .catch(error => console.error(`getRequest: ${error}`))
}

export const getRequest = async url => {
    return await fetch(url)
        .then(response => response.json())
        .catch(error => console.error(`getRequest: ${error}`))
}