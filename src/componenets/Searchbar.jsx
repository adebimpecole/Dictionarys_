import React, { useState, useContext, useEffect } from 'react'
import Context from '../Context'
import srch from "../assets/search.svg"
import "./Searchbar.sass"

const Searchbar = () => {
    const  [val, setVal] = useState('')
    const  [stat, setStat] = useState(false)
    const state = useContext(Context);
    const inputbox = document.querySelector("#gsearch");

    useEffect(()=>{
        if(inputbox){
            setVal(inputbox.value)
            console.log(val)
            state(inputbox.value);
        }
        setStat(false)
    },[stat, setStat]) 

  return (
    <div className='search-box'>
        <form className='search_box'>
            <label htmlFor="gsearch"><img src={srch} className="search_icon" alt="icon" onClick={()=>(setStat(true))}/></label>
            {/* <label htmlFor="gsearch"><img src={srch} className="search_icon" alt="icon"/></label> */}
            <input defaultValue={val} type="search" id="gsearch" name="gsearch" />
        </form>
    </div>
  )
}

export default Searchbar
