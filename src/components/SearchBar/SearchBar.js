import React from "react";
import "./SaerchBar.css";
import IconSearch from "../../Icons/IconSearch.svg";

function SearchBar ({data}) {
    return (
        <>
        <div>
            <img src={IconSearch} alt='Icon-search' className='icon-search'/>
            <input 
                className='input-search'
            />
            <div>
                {data.map((value, key) => {
                    return <div>{value.title}</div>
                })}
            </div>
        </div>
        </>
    );
}

export default SearchBar;