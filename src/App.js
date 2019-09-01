import React, { useState } from 'react';
import { baseURL, getRequest } from './helpers/API'
import { mostRepeatableValueInObject } from './helpers/helperFunctions'
import Aux from './HOC/Aux'

import './styles/_symbols.scss';
import styles from './App.module.scss';

import SearchForm from './components/SearchForm/SearchForm'
import UserCard from './components/User/Card/Card'
import RepoList from './components/User/RepoList/RepoList'

const App = () => {
  const [gitUserData, setgitUserData] = useState(null)
  const reposPageLimit = 20;

  const fetchUserData = async userName => {
    const userData = await getRequest(`${baseURL}/${userName}`)
    if (!userData) return false
    const userRepos = await fetchUserRepos(userData.repos_url)
    const favouriteLanguages = mostRepeatableValueInObject(userRepos, 'language', reposPageLimit)

    if (userRepos && favouriteLanguages) {
      setgitUserData({
        userData,
        userRepos,
        favouriteLanguages
      })
    }
  }

  const fetchUserRepos = async (url, page = 1) => {
    const userRepos = await getRequest(`
      ${url}?page=${page}&per_page=${reposPageLimit}
    `)

    return userRepos
  }

  return (
    <div className={styles.page_container}>
      <SearchForm fetchUserData={fetchUserData} />
      {
        gitUserData &&
        <Aux>
          {
            (gitUserData.userData && gitUserData.favouriteLanguages) &&
            <UserCard userDetails={gitUserData.userData}
              languages={gitUserData.favouriteLanguages} />
          }
          {
            gitUserData.userData &&
            <RepoList url={gitUserData.userData.repos_url}
              fetchUserRepos={fetchUserRepos} />
          }
        </Aux>
      }
    </div>
  );
}

export default App;
