import React, { useState, useEffect } from 'react'
import RepoCard from './RepoCard/RepoCard'

import styles from './RepoList.module.scss'

const RepoList = ({ url, fetchUserRepos }) => {
    const [repoListState, setrepoListState] = useState({
        repos: [],
        page: 1
    })

    useEffect(() => {
        const onLoadHandler = async () => {
            const fetchedRepos = await fetchUserRepos({ url })
            setrepoListState({
                repos: fetchedRepos,
                page: 2
            })
        }
        onLoadHandler()
    }, [url])

    const showMoreHandler = async () => {
        const fetchedRepos = await fetchUserRepos({url, page: repoListState.page})
        if (!fetchedRepos) return false
        const newList = [...repoListState.repos, ...fetchedRepos]

        if (fetchedRepos.length) {
            setrepoListState({
                repos: newList,
                page: repoListState.page + 1
            })
        }
    }

    const reposToRender = repoListState.repos ? repoListState.repos : []

    return (
        <div className={styles.repo_list}>
            {
                reposToRender.map((repo, index) => {
                    return <RepoCard key={index} repo={repo} />
                })
            }
            <div className={styles.more_repos}>
                <button className="btn btn-md" onClick={showMoreHandler}>More</button>
            </div>
        </div>
    )
}

export default RepoList

RepoList.defaultProps = {
    url: '',
    fetchUserRepos: () => []
}