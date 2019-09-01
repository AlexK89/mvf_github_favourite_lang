import React from 'react'
import styles from './Card.module.scss'

const Card = ({ userDetails, languages }) => {
    return (
        (userDetails && languages) && 
            <div className={`container ${styles.user_card_wrapper}`}>
                <div className={styles.user_card}>
                    <div className={styles.user_card__img}>
                        <img src={userDetails.avatar_url} alt={`${userDetails.login} avatar`}/>
                    </div>
                    <ul className={styles.user_card__details}>
                        <li><strong>User name:</strong> {userDetails.login}</li>
                        <li><strong>Repos:</strong> {userDetails.public_repos}</li>
                        <li><strong>Followers:</strong> {userDetails.followers}</li>
                    </ul>
                    <p className={styles.user_card__language}>
                        <strong>Favourite language:</strong>
                        <span>{languages.join(', ')}</span>
                    </p>
                </div>
            </div>
    )
}

export default Card

Card.defaultProps = {
    userDetails: false,
    languages: false
}
