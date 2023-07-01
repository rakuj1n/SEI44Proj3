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
        <div>
            <div>
                { search && 
                (<form onSubmit={handleSearch}>
                    <label>
                        <input name='searchinput' onChange={handleChange} value={searchInput} placeholder='Search Following'/>
                    </label>
                </form>)}
                {search && <CloseOutlined onClick={handleClose}/>}
            </div>
            <SearchOutlined onClick={handleClick}/>
        </div>
    )
}