import React, {useState} from 'react'
import styles from './SearchForm.module.scss'

const SearchForm = props => {
    const { fetchUserData } = props
    const [inputValue, setinputValue] = useState('')

    const changeHandler = event => setinputValue(event.target.value)

    const formSubmitHandler = event => {
        event.preventDefault()
        fetchUserData(inputValue)
        setinputValue('')
    }

    return (
        <div className={`container ${styles.search_form}`}>
            <form onSubmit={formSubmitHandler} autoComplete="off">
                <input  type="text"
                        onChange={changeHandler}
                        value={inputValue}
                        name="username" 
                        pattern="[A-Za-z0-9]+" 
                        title="Can contain letters and numbers only" required/>
                <button type="submit" className="btn btn-sm">Submit</button>
            </form>
        </div>
    )
}

export default SearchForm

SearchForm.defaultProps = {
    fetchUserData: () => null
}
