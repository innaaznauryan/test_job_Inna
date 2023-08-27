import {useState, useEffect} from 'react'
import "./edit.scss"

const Edit = (props) => {
    const {data, id, exit, editPerson} = props

    const [editInfo, setEditInfo] = useState(() => {
        const element = data.find(elem => elem.id == id)
        return {
            fname: element.fname,
            lname: element.lname,
            phone: element.phone, 
            bday: element.bday
        }
    })
    const [isLoaded, setIsLoaded] = useState(false)

    const handleEditChange = (e) => {
        setEditInfo({...editInfo, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        setIsLoaded(true)
        return () => setIsLoaded(false)
    }, [])
    
  return (
    <>
    <div className="veil"></div>
    <div className='modal'>
        <h1>Edit</h1>
        <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="fname" type="text" value={editInfo.fname}/>
        <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="lname" type="text" value={editInfo.lname}/>
        <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="phone" type="text" value={editInfo.phone}/>
        <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="bday" type="text" value={editInfo.bday}/>
        <div className="btns">
            <button className='edit' onClick={()=> exit({mode: false, id: null})}>Cancel</button>
            <button className='edit' onClick={() => {
                editPerson(id, editInfo.fname, editInfo.lname, editInfo.phone, editInfo.bday)
                exit({mode: false, id: null})
            }}>Save</button>
        </div>
    </div>
    </>
  )
}

export default Edit