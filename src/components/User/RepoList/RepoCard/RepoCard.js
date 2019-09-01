import React from 'react'

import styles from './RepoCard.module.scss'

const RepoCard = ({ repo }) => {
    return (
        repo &&
            <div className={`container ${styles.repo_card_wrapper}`}>
                <div className={styles.repo_card}>
                    <h5>{repo.name}</h5>
                    <h5>Language: {repo.language ? repo.language : 'None'}</h5>
                    <p className={styles.repo_card__ssh}><strong>SSH:</strong> {repo.ssh_url}</p>
                    <div className={styles.repo_card__more}>
                        <button className="btn btn-sm">
                            <a href={repo.html_url}
                                target="_blank" rel="noopener noreferrer">
                                Go to repo
                            </a>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default RepoCard

RepoCard.defaultProps = {
    repo: false
}
