import React, { useState } from 'react';
import { baseURL, getRequest } from './helpers/API'
import { 
  mostRepeatableValueInObject, 
  fetchUserRepos, 
  getLimitForArray } from './helpers/helperFunctions'
import Aux from './HOC/Aux'

import './styles/_symbols.scss';
import styles from './App.module.scss';

import SearchForm from './components/SearchForm/SearchForm'
import UserCard from './components/User/Card/Card'
import RepoList from './components/User/RepoList/RepoList'

const App = () => {
  const [gitUserData, setgitUserData] = useState(null)

  const fetchUserData = async userName => {
    const userData = await getRequest(`${baseURL}/${userName}`)

    if (!userData) return false

    const reposPageLimit = getLimitForArray(userData.public_repos)
    console.log(reposPageLimit)
    const userRepos = await fetchUserRepos({ url: userData.repos_url, reposPageLimit})
    const favouriteLanguages = mostRepeatableValueInObject({
      objectsArray: userRepos, 
      objectKey: 'language'
    })

    if (userRepos && favouriteLanguages) {
      setgitUserData({
        userData,
        userRepos,
        favouriteLanguages
      })
    }
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
