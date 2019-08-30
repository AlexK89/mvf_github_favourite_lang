import React, { useState, useEffect } from 'react';
import { baseURL, getRequest } from './helpers/API'
import Aux from './hoc/Aux'
import styles from './App.module.scss';

import SearchForm from './components/SearchForm/SearchForm'
import UserCard from './components/UserCard/UserCard'
import UserRepos from './containers/UserRepos'

const App = () => {
  const [gitUserData, setgitUserData] = useState(null)

  const fetchUserData = async userName => {
    const userData = await getRequest(`${baseURL}/${userName}`)
    setgitUserData(userData)
  }

  return (
    <div className={styles.page_container}>
      <SearchForm fetchUserData={fetchUserData} />
      {
        gitUserData &&
          <Aux>
            <UserCard />
            <UserRepos />
          </Aux>
      }
    </div>
  );
}

export default App;
