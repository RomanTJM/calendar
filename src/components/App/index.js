import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { Header } from '../Header/Header';
import { Monitor } from '../Monitor/Monitor';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import styled from 'styled-components';
import './App.css'
import IconСross from '../../Icons/IconСross.svg'

const ShadowWrapper = styled('div')`

`;

const url = 'http://localhost:3001'
const defaultEvent = {
  title: '',
  participants: '',
  description: '',
  date: moment().format('X')
}

function App() {

  moment.updateLocale('ru', {week: {dow: 1}});
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const pervHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);

  const [event, setEvent] = useState(null);

  const [events, setEvents] = useState([]);
  const startDataQuery = startDay.clone().format('X');
  const endDataQuery = startDay.clone().endOf('month').endOf('week').format('X');
  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDataQuery}_lte=${endDataQuery}`)
    .then(res => res.json())
    .then(res => setEvents(res));
  }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setShowForm(true);
    setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
    setMethod(methodName);
  }

  const cancelButtonHeandler = () => {
    setShowForm(false);
    setEvent(null);
  }

  const changeEventHeadler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  const eventFetchHandler = () => {
    const fetchUrl = method === 'Редактировать' ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === 'Редактировать' ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(method === 'Редактировать') {
        setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
      } else {
        setEvents(prevState => [... prevState, res]);
      }      
      cancelButtonHeandler()
    })
  }

  const RemoveEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
        setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))    
      cancelButtonHeandler()
    })
  }

  return (
    <>
      {
        isShowForm ? (
          <div className='form-position-wrapper' onClick={cancelButtonHeandler}>
            <div className='form-wrapper' onClick={e => e.stopPropagation()}>
              <div className='btn-icon-cross' onClick={cancelButtonHeandler}>
                <img src={IconСross} alt='icon cross' className='icon-cross'/>
              </div>
              <input 
                className='event-title'
                placeholder='Событие' 
                value={event.title}
                onChange={e => changeEventHeadler(e.target.value, 'title')}
              >
              </input>
              <input
                className='event-date'
                placeholder='День, месяц, год'  
                value={event.date}
                onChange={e => changeEventHeadler(e.target.value, 'date')}
              >
              </input>
              <input
                className='event-participants' 
                value={event.participants}
                placeholder='Имена участников' 
                onChange={e => changeEventHeadler(e.target.value, 'participants')}
              >
              </input>
              <input 
                className='event-body' 
                placeholder='Описание' 
                value={event.description}
                onChange={e => changeEventHeadler(e.target.value, 'description')}
                >
              </input>
                <div className='buttons-wrapper'>
                  <button className='btn-form btn-text' onClick={cancelButtonHeandler}>Готово</button>
                  <button className='btn-form btn-text' onClick={eventFetchHandler}>{method}</button>
                  {
                    method === 'Редактировать' ? (
                      <button className='btn-form btn-text' onClick={RemoveEventHandler}>Удалить</button>
                    ) : null
                  }            
                </div>
            </div>
          </div>
        ) : null
      }    

      <ShadowWrapper>
      <Header/>
      <Monitor 
        today={today}
        pervHandler={pervHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <CalendarGrid 
        startDay={startDay} 
        today={today} 
        events={events} 
        openFormHandler={openFormHandler}/>
      </ShadowWrapper>
    </>
  );
}

export default App;
