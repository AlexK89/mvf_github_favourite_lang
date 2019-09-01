import React, { useState } from 'react';
import { baseURL, getRequest, fetchLanguages } from './helpers/API'
import { mostRepeatableValueInObject, fetchUserRepos } from './helpers/helperFunctions'
import Aux from './HOC/Aux'

import './styles/_symbols.scss';
import styles from './App.module.scss';

import SearchForm from './components/SearchForm/SearchForm'
import UserCard from './components/User/Card/Card'
import RepoList from './components/User/RepoList/RepoList'

const App = () => {
  const [gitUserData, setgitUserData] = useState(null)

  const fetchUserData = async userName => {
    const graphObject = await fetchLanguages(userName)
    if (!graphObject || !graphObject.data) return false

    const languagesArrayOfObjects = graphObject.data.user.repositories.nodes
    const favouriteLanguages = mostRepeatableValueInObject(languagesArrayOfObjects)

    const userData = await getRequest(`${baseURL}/${userName}`)
    if (!userData || !userData.login) return false

    const userRepos = await fetchUserRepos({ url: userData.repos_url})

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
