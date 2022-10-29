import React, { useState } from "react";
import "./Header.css";
import IconSearch from "../../Icons/IconSearch.svg";
import IconСross from '../../Icons/IconСross.svg';
import ArrowForm from '../../Icons/ArrowForm.svg';
// import SearchBar from './../SearchBar/SearchBar';

function Header () {

    const [isFormHeader, setIsFormHeader] = useState(false);

    const openFormHeader = () => {
        setIsFormHeader(true);
    }

    const cancelFormHeader = () => {
        setIsFormHeader(false);
    }

    const refreshPage = () => {
        document.location.reload();
    }

    return (
        <>
            {                   
                isFormHeader ? (
                <div className="form-header">
                    <img src={ArrowForm} alt='Arrow form' className='arrow-form'/>
                    <div className='btn-icon-cross' onClick={cancelFormHeader}>
                        <img src={IconСross} alt='icon cross' className='icon-cross'/>
                    </div>
                    <input 
                        className="form-header-input"
                        placeholder='Дата, событие, участники'
                    >
                        
                    </input>
                    <button className="form-header-btn">
                        Создать
                    </button>
                </div>
                
                ) : null
            }  

            <div className="header-wrapper">
                <div className="btn-header-conteiner">
                    <button className="btn-header" onClick={openFormHeader}>Добавить</button>
                    <button className="btn-header" onClick={refreshPage}>Обновить</button>
                </div>
                <img src={IconSearch} alt='Icon-search' className='icon-search'/>
                <input 
                    className='input-search'
                />
            </div>
        </>

    )
};

export { Header };