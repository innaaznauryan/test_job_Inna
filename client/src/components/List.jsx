import {useState, useEffect} from 'react'
import Edit from './Edit'
import Search from './Search'
import Form from './Form'
import Pagination from './Pagination'
import "./list.scss"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"

const url = "http://localhost:8180/"

const List = () => {
    const range = 5
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [editMode, setEditMode] = useState({
        mode: false,
        id: null
    })
    const [error, setError] = useState(null)
    const [filtered, setFiltered] = useState([])
    const [filterMode, setFilterMode] = useState(false)

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(url)
                if(!response.ok) throw new Error("Response was not ok")
                const {data} = await response.json()
                console.log(data)
                setData(data)
                localStorage.setItem("data", JSON.stringify(data))
                localStorage.setItem("fetched", true)
            } catch (error) {
                console.error("Error fetching data", error)
            }
        })()
    }, [])

    useEffect(()=> {
        setPagination([...data].slice(pageNumber * range, pageNumber * range + range))
    }, [data, pageNumber])

    function validatePhone(phone) {
        return /^\+\d{10}$/.test(phone);
    }
    function validateDate(date) {
        return /\d{4}-\d{2}-\d{2}/.test(date);
    }

    const addPerson = (e) => {

        e.preventDefault()
        const {phone, bday} = e.target
        const isValidPhone = validatePhone(phone.value)
        const isValidDate = validateDate(bday.value)
        if (!isValidPhone || !isValidDate) {
            setError(isValidPhone ? "Wrong date format!" : "Wrong phone format!")
            setTimeout(() => {
                setError(null)
                e.target.reset()
            }, 2000);
        } else {
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
                    if(!response.ok) throw new Error("Response was not ok")
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
                if(!response.ok) throw new Error("Response was not ok")
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
                if(!response.ok) throw new Error("Response was not ok")
                return response.json()
            })
            .then(data => {
                console.log("Response data:", data)
            })
            .catch(error => {
                console.error("Error deleting data:", error)
            })
    }


  return (
  <>
    <Search data={data} setFilterMode={setFilterMode} setFiltered={setFiltered} key="search" />

    {!filterMode && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} data={data} range={range} />}

    <div className='person header' key="head">
        <div className='layout heading'>First Name</div>
        <div className='layout heading'>Last Name</div>
        <div className='layout heading'>Phone Number</div>
        <div className='layout heading'>Date of Birth</div>
        <div className='layout heading'>Actions</div>
    </div>

    {(filterMode ? filtered : pagination).map(({id, fname, lname, phone, bday}) => {
        return <div key={id} className='person'>
            <div className='layout'><span>{fname[0].toUpperCase() + fname.slice(1).toLowerCase()}</span></div>
            <div className='layout'><span>{lname[0].toUpperCase() + lname.slice(1).toLowerCase()}</span></div>
            <div className='layout'><span>{phone}</span></div>
            <div className='layout'><span>{bday}</span></div>
            <div className='controls layout'>
                <AiFillEdit className='edit' onClick={() => openEditModal(id)}/>
                <AiFillDelete className='delete' onClick={() => deletePerson(id)}/>
            </div>
        </div>
    })}

    <Form addPerson={addPerson} />

    <div className="error">{error && <p>{error}</p>}</div>

    {editMode.mode && <Edit data={data} id={editMode.id} exit={setEditMode} editPerson={editPerson}/>}
  </>
  )
}

export default List