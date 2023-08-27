import React from 'react'
import "./search.scss"

const Search = ({data, setFilterMode, setFiltered}) => {

  const searchPerson = (e) => {
    e.preventDefault()
    const {search} = Object.fromEntries([...new FormData(e.target)])
    const regExp = new RegExp(`${search}`, "i")
    let filteredArr = []
    filteredArr = data.filter(elem => {
        return (
            regExp.test(elem.fname)
            || regExp.test(elem.lname)
            || regExp.test(elem.phone)
            || regExp.test(elem.bday)
        )
    })
    setFilterMode(true)
    setFiltered(filteredArr)
}

  return (
    <div className="searchDiv">
        <form action="" onSubmit={searchPerson}>
            <input type="text" id='search' name='search' placeholder='Search for someone awesome!'/>
            <button type='submit' className='btn'>Search</button>
        </form>
    </div>
  )
}

export default Search