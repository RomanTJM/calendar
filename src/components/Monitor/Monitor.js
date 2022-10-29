import React from "react";
import './Monitor.css'
import iconLeft from "../../Icons/iconLeft.svg"
import iconRight from "../../Icons/iconRight.svg"

const Monitor = ({today, pervHandler, todayHandler, nextHandler}) => (
    <div className="div-wrapper">
        <button className="btn-monitor" onClick={pervHandler}>
            <img src={iconLeft} alt='icon left' className=''/>
        </button>
        <div className="monitor-date-span">
            <span>{today.format('MMMM')}</span>
            <span>{today.format('YYYY')}</span>
        </div> 
        <button className="btn-monitor" onClick={nextHandler}>
            <img src={iconRight} alt='icon right' className=''/>
        </button>
        <button className="btn-current-day" onClick={todayHandler}>Сегодня</button>
    </div>
);

export { Monitor };