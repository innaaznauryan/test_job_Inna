import React from 'react'
import "./search.scss"

const Search = ({searchPerson}) => {
  return (
    <div className="searchDiv">
        <form action="" onSubmit={searchPerson}>
            <input type="text" id='search' name='search' placeholder='Search for someone awesome!'/>
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}

export default Search