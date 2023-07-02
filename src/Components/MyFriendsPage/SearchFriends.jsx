import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";


export default function SearchFriends({setFiltered,handleFilter,setCurrSelectedFollowing}) {
    const [search, setSearch] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    function handleChange(e) {
        setSearchInput(e.target.value)
    }

    function handleClick(e) {
        if (searchInput !== '') {
            handleSearch(e)
        } else {
            setSearch((prev) => !prev)
        }
    }

    function handleClose() {
        setSearchInput('')
        setSearch(false)
        setFiltered(false)
        setCurrSelectedFollowing(null)
    }

    function handleSearch(e) {
        e.preventDefault()
        if (searchInput !== '') {
            console.log("handlesearch")
            setFiltered(true)
            handleFilter(searchInput)
        }
    }

    return (
        <div className="searchmaincontainer">
            {search && 
            <div className="searchcontainer">
                <form onSubmit={handleSearch}>
                    <label>
                        <input className='input' name='searchinput' onChange={handleChange} value={searchInput} placeholder='Search & Enter'/>
                    </label>
                </form>
                <CloseOutlined className='closebutton' onClick={handleClose}/>
            </div>}
            <div className="searchbuttoncontainer">
            <SearchOutlined className='searchbutton' onClick={handleClick}/>
            </div>
        </div>
    )
}