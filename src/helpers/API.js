export const baseURL = 'https://api.github.com/users'

export const getRequest = async url => {
    return await fetch(url)
        .then(response => response.json())
        .catch(error => console.error(`getRequest: ${error}`))
}