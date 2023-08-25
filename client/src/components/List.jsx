import {useState, useEffect, useRef} from 'react'
import Edit from './Edit'
import "./list.scss"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"

const dataLocal = [
    {
        id: "1",
        fname: "Tom",
        lname: "Hanks",
        phone: "+1123456789", 
        bday: "1956-07-09"
    },
    {
        id: "2",
        fname: "Will",
        lname: "Smith",
        phone: "+1123457777", 
        bday: "1996-07-09"
    },
    {
        id: "3",
        fname: "Bruce",
        lname: "Willis",
        phone: "+1123444789", 
        bday: "1966-08-09"
    },
]

const List = () => {

    const [data, setData] = useState(
        () => dataLocal
        // () => return data get from backend 
    )
    const [currentId, setCurrentId] = useState(
        // () => return id get from backend 
    )
    const [editMode, setEditMode] = useState({
        mode: false,
        id: null
    })
    const [error, setError] = useState(null)
    const inputRef = useRef(null)

    const handleAdd = (e) => {
        e.preventDefault()
        const {fname, lname, phone, bday} = e.target
        if (!/^\+\d+$/.test(phone.value)) {
            console.log("boo")
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

        const FD = Object.fromEntries([...new FormData(e.target)])
        const newPerson = {
            // id: get id from backend 
            ...FD
        }
        setData((p => ([...p, newPerson])))
        // set new data in backend
        // set new current id in backend
        e.target.reset()
    }

    const handleEdit = (id) => {
        setEditMode({mode: true, id})
    }

    const handleDelete = (id) => {
        setData(data.filter(elem => elem.id != id))
        // set new data in backend 
    }

    const handleRenew = (id, fname, lname, phone, bday) => {
        const renewed = {id, fname, lname, phone, bday}
        setData(data.with(data.findIndex(elem => elem.id == id), renewed))
        // set new data in backend 
    }

    // useEffect(() => {
    //     // const FD = Object.fromEntries([...new FormData(e.target)])
    //     const {value} = inputRef.current
    //     console.log(value)
    //     const regExp = new RegExp(`${value}`, "i")
    //     let filtered = []
    //     if (value.trim() == "") filtered = [...data]
    //     else filtered = data.filter(elem => {
    //         return (
    //             regExp.test(elem.fname)
    //             || regExp.test(elem.lname)
    //             || regExp.test(elem.phone)
    //             || regExp.test(elem.bday)
    //         )
    //     })
    //     setData(filtered)
    //     console.log(filtered)
    // }, [inputRef.current.value])

  return (
  <>
  {/* <div className="searchDiv">
    <form action="" >
        <input ref={inputRef} type="text" id='search' name='search'/>
        <button type='submit'>Search</button>
    </form>
  </div> */}

  <div className='person' key="head">
    <div className='layout heading'>First Name</div>
    <div className='layout heading'>Last Name</div>
    <div className='layout heading'>Phone Number</div>
    <div className='layout heading'>Date of Birth</div>
    <div className='layout heading'>Actions</div>
  </div>
    {
        data.map(({id, fname, lname, phone, bday}) => {
            return <div key={id} className='person'>
                <div className='layout'><span>{fname}</span></div>
                <div className='layout'><span>{lname}</span></div>
                <div className='layout'><span>{phone}</span></div>
                <div className='layout'><span>{bday}</span></div>
                <div className='controls layout'>
                    <AiFillEdit className='edit' onClick={() => handleEdit(id)}/>
                    <AiFillDelete className='delete' onClick={() => handleDelete(id)}/>
                </div>
            </div>
        })
    }
    <form onSubmit={handleAdd}>
        <fieldset className='person'>
            <input type='text' name='fname' id='fname' placeholder='First Name' required/>
            <input type='text' name='lname' id='lname' placeholder='Last Name' required/>
            <input type='text' name='phone' id='phone' placeholder='Phone Number' required/>
            <input type='text' name='bday' id='bday' placeholder='Date of Birth' required/>
            <div><button type='submit'>Add Number</button></div>
        </fieldset>
    </form>
    <div className="error">{error && <p>{error}</p>}</div>
    {editMode.mode && <Edit data={data} id={editMode.id} exit={setEditMode} handleRenew={handleRenew}/>}
  </>
  )
}

export default List

// search func and button
// backend
// docker container