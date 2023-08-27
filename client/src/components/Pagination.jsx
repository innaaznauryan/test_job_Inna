import {useState, useEffect} from 'react'
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from "react-icons/bs"
import "./pagination.scss"

const Pagination = ({pageNumber, setPageNumber, data, range}) => {

    const [active, setActive] = useState({})

    const handleClick = (type) => {
        switch(type) {
            case "DECREMENT":
                setPageNumber(p => p - 1)
                break
            case "INCREMENT":
                setPageNumber(p => p + 1)
                break
        }
    }

    useEffect(() => {
        setActive({
            DECREMENT: pageNumber <= 0 ? false : true,
            INCREMENT: pageNumber >= Math.floor((data.length / range)) ? false : true
        })
    }, [pageNumber, data, range])

  return (
    <div className="pagination">
        {active.DECREMENT && <BsFillArrowLeftSquareFill className="left" onClick={()=> handleClick("DECREMENT")}/>}
        <span>{pageNumber + 1}</span>
        {active.INCREMENT && <BsFillArrowRightSquareFill className='right' onClick={()=> handleClick("INCREMENT")}/>}
    </div>
  )
}

export default Pagination