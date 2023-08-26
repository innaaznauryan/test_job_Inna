import {useState} from 'react'
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

    const handleEditChange = (e) => {
        setEditInfo({...editInfo, [e.target.name]: e.target.value})
    }
    
  return (
    <>
    <div className="veil"></div>
    <div className='modal'>
        <h1>Edit</h1>
        <input onChange={handleEditChange} name="fname" type="text" value={editInfo.fname}/>
        <input onChange={handleEditChange} name="lname" type="text" value={editInfo.lname}/>
        <input onChange={handleEditChange} name="phone" type="text" value={editInfo.phone}/>
        <input onChange={handleEditChange} name="bday" type="text" value={editInfo.bday}/>
        <div className="btns">
            <button className='edit' onClick={() => exit({mode: false, id: null})}>Cancel</button>
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