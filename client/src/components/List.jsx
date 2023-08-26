import {useState, useEffect} from 'react'
import Edit from './Edit'
import Search from './Search'
import "./list.scss"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"

const url = "http://localhost:8180/"

const List = () => {

    const [data, setData] = useState([])
    const [editMode, setEditMode] = useState({
        mode: false,
        id: null
    })
    const [error, setError] = useState(null)
    const [filtered, setFiltered] = useState([])
    const [filterMode, setFilterMode] = useState(false)

    useEffect(() => {
        async function fetchData () {
            try {
                const response = await fetch(url)
                const result = await response.json()
                console.log(result.data)
                setData(result.data)
            } catch (error) {
                console.error("Error fetching data", error)
            }
        }
        fetchData()
    }, [])


    const addPerson = (e) => {

        e.preventDefault()
        const {fname, lname, phone, bday} = e.target
        if (!/^\+\d{10}$/.test(phone.value)) {
            setError("Wrong phone format!")
            e.target.reset()
            setTimeout(() => setError(null), 2000);
            return
        }
        if (!/\d{4}-\d{2}-\d{2}/.test(bday.value)) {
            setError("Wrong date format!")
            e.target.reset()
            setTimeout(() => setError(null), 2000);
            return
        }
        const newPerson = {...Object.fromEntries([...new FormData(e.target)])}
        setData((p => ([...p, newPerson])))

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(newPerson),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, requestOptions)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response was not ok")
                }
                return response.json()
            })
            .then(data => {
                console.log("Response data:", data)
            })
            .catch(error => {
                console.error("Error posting data:", error)
            })
        e.target.reset()
    }


    const openEditModal = (id) => {
        setEditMode({mode: true, id})
    }

    const editPerson = (id, fname, lname, phone, bday) => {
        const renewed = {id, fname, lname, phone, bday}
        setData(data.with(data.findIndex(elem => elem.id == id), renewed))
        const requestOptions = {
            method: "PATCH",
            body: JSON.stringify(renewed),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, requestOptions)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response was not ok")
                }
                return response.json()
            })
            .then(data => {
                console.log("Response data:", data)
            })
            .catch(error => {
                console.error("Error patching data:", error)
            })
    }

    const deletePerson = (id) => {
        setData(data.filter(elem => elem.id != id))
        const toDelete = data.find(elem => elem.id == id)
        const requestOptions = {
            method: "DELETE",
            body: JSON.stringify(toDelete),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, requestOptions)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response was not ok")
                }
                return response.json()
            })
            .then(data => {
                console.log("Response data:", data)
            })
            .catch(error => {
                console.error("Error deleting data:", error)
            })
    }

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
  <>
  <Search searchPerson={searchPerson} key="search" />

  <div className='person' key="head">
    <div className='layout heading'>First Name</div>
    <div className='layout heading'>Last Name</div>
    <div className='layout heading'>Phone Number</div>
    <div className='layout heading'>Date of Birth</div>
    <div className='layout heading'>Actions</div>
  </div>
    {(filterMode ? filtered : data).map(({id, fname, lname, phone, bday}) => {
        return <div key={id} className='person'>
            <div className='layout'><span>{fname}</span></div>
            <div className='layout'><span>{lname}</span></div>
            <div className='layout'><span>{phone}</span></div>
            <div className='layout'><span>{bday}</span></div>
            <div className='controls layout'>
                <AiFillEdit className='edit' onClick={() => openEditModal(id)}/>
                <AiFillDelete className='delete' onClick={() => deletePerson(id)}/>
            </div>
        </div>
    })}
    <form onSubmit={addPerson}>
        <fieldset className='person'>
            <input type='text' name='fname' id='fname' placeholder='First Name' required/>
            <input type='text' name='lname' id='lname' placeholder='Last Name' required/>
            <input type='text' name='phone' id='phone' placeholder='Phone Number' required/>
            <input type='text' name='bday' id='bday' placeholder='Date of Birth' required/>
            <div><button type='submit'>Add Number</button></div>
        </fieldset>
    </form>
    <div className="error">{error && <p>{error}</p>}</div>
    {editMode.mode && <Edit data={data} id={editMode.id} exit={setEditMode} editPerson={editPerson}/>}
  </>
  )
}

export default List