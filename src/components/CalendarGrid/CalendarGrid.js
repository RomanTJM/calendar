import moment from "moment";
import React from "react";
import "./CalendarGrid.css";

const CalendarGrid = ({startDay, events, openFormHandler}) => {
    const totalDays = 35;
    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

    const isCurrentDay = (day) => moment().isSame(day, 'day');
    return(
        <div className="grid-wrapper">
            {
                daysMap.map((dayItem) => (
                    <div className="cell-wrapper" 
                    key={dayItem.unix()}
                    >
                    <div className="row-in-cell">
                        <div className="show-day-wrapper">
                            <button className="day-wrapper" onDoubleClick={() => openFormHandler('Добавить', null, dayItem)} >      
                                {
                                    isCurrentDay(dayItem) ? (
                                    <div className="current-day">{dayItem.format('D')}</div>
                                    ) : (
                                        dayItem.format('D')
                                    )
                                }
                            </button>
                        </div>
                        <ul className="event-list-wrapper">
                            {
                            events
                                .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                .map(event => (
                                    <li key={event.id}>
                                        <button className="event-item-wrapper text-title" onDoubleClick={() => openFormHandler('Редактировать', event)} >{event.title}</button>                                        
                                    </li>
                                ))
                            }
                            {
                            events
                                .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                .map(event => (
                                    <li key={event.id}>
                                        <button className="event-item-wrapper text-description" onDoubleClick={() => openFormHandler('Редактировать', event)}>{event.participants}</button>                                        
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    </div>
                ))
            }
        </div>
    );
};

export { CalendarGrid };