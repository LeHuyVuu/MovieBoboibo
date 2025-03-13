import React, { useState } from 'react';
import './BookingMovie.css';

import { AvailableTime, TypeOfTicket } from './data';

export default function BookingMovie() {

    const GuessedPassword = [];

    const [ChosenDay, setChosenDay] = useState(new Date().toLocaleString('en-US', { weekday: 'short' }));
    const [ChosenDate, setChosenDate] = useState(new Date().toISOString().split('T')[0]);
    const [ChosenTime, setChosenTime] = useState({ Time: AvailableTime[0].Time, Category: '' });
    const [ChildTicket, setChildTicket] = useState(0);
    const [AdultTicket, setAdultTicket] = useState(0);
    const [AdultCoupleTicket, setAdultCoupleTicket] = useState(0);

    const [Ticket, setTicket] = useState({
        Child: 0,
        Adult: 0,
        AdultCouple: 0
    });


    const handleSetDayAndDate = (index) => {
        const today = new Date();
        const dayofweek = new Date(today);
        dayofweek.setDate(today.getDate() - today.getDay() + index + 1);
        setChosenDate(dayofweek.toISOString().split('T')[0]);
        setChosenDay(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayofweek.getDay()]);
    }

    const AddTicket = (Name) => {
        if (Name === 'Child') {
            setTicket(prev => ({ ...prev, Child: prev.Child + 1 }));
        } else if (Name === 'Adult') {
            setTicket(prev => ({ ...prev, Adult: prev.Adult + 1 }));
        } else if (Name === 'Adult Couple') {
            setTicket(prev => ({ ...prev, AdultCouple: prev.AdultCouple + 1 }));
        }
    }

    const SubtractTicket = (Name) => {
        if (Name === 'Child' && Ticket.Child > 0) {
            setTicket(prev => ({ ...prev, Child: prev.Child - 1 }));
        } else if (Name === 'Adult' && Ticket.Adult > 0) {
            setTicket(prev => ({ ...prev, Adult: prev.Adult - 1 }));
        } else if (Name === 'Adult Couple' && Ticket.AdultCouple > 0) {
            setTicket(prev => ({ ...prev, AdultCouple: prev.AdultCouple - 1 }));
        }
    }

    return (
        <div className='bookingmovie-container'>
            <h1>BOOKING MOVIE</h1>

            {/* <Form.Group controlId='movieTheater' className='form-group'>
                <h2>Choose Theater</h2>
                <Form.Select>
                    <option value="">-- Choose Theater --</option>
                    <option value="cgv">CGV</option>
                    <option value="lotte">Lotte Cinema</option>
                    <option value="galaxy">Galaxy Cinema</option>
                    <option value="bhd">BHD Star Cineplex</option>
                </Form.Select>
            </Form.Group> */}

            <div className='table-container'>
                <div className='day-date-container'>
                    <h2>{ChosenDay}, {ChosenDate}</h2>
                    <table className='no-wrap align-middle table'>
                        <thead>
                            <tr>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {[...Array(7)].map((_, index) => (
                                    <td
                                        key={index}
                                        onClick={() => { handleSetDayAndDate(index) }}
                                    >
                                        <div
                                            className={(() => {
                                                const today = new Date();
                                                const dayofweek = new Date(today);
                                                dayofweek.setDate(today.getDate() - today.getDay() + index + 1);
                                                return dayofweek.toISOString().split('T')[0] === ChosenDate ? 'this-date' : '';
                                            })()}
                                        >
                                            {(() => {
                                                const today = new Date();
                                                const dayofweek = new Date(today);
                                                dayofweek.setDate(today.getDate() - today.getDay() + index + 1);
                                                return dayofweek.getDate();
                                            })()}
                                        </div>
                                    </td>
                                ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='time-container'>
                    <h2>{ChosenTime.Time}</h2>
                    <table className='no-wrap align-middle table'>
                        <thead>
                            <tr>
                                {AvailableTime.map((time, index) => (
                                    <th key={index}>{time.Category}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {AvailableTime.map((time, index) => (
                                    <td key={index} onClick={() => setChosenTime(time)}>
                                        <div
                                            className={time.Time === ChosenTime.Time ? 'this-time' : ''}
                                        >
                                            {time.Time}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <div> */}
                <h2>Choose Type Of Ticket</h2>
                <div className='table-container'>
                    <div className='type-of-ticket-container'>
                        <table className='no-wrap align-middle table'>
                            <thead>
                                <tr>
                                    {TypeOfTicket.map((ticket, index) => (
                                        <th key={index}>{ticket.Name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {TypeOfTicket.map((ticket, index) => (
                                        <td key={index}>
                                            <div className='detail-container'>
                                                <span>{ticket.Price} VND</span>
                                                <div className='button-container'>
                                                    <button className='btn' onClick={() => AddTicket(ticket.Name)}>+</button>
                                                    <span>
                                                        {ticket.Name === 'Child' ?
                                                            Ticket.Child
                                                            :
                                                            (ticket.Name === 'Adult' ?
                                                                Ticket.Adult
                                                                :
                                                                (ticket.Name === 'Adult Couple' ?
                                                                    Ticket.AdultCouple
                                                                    :
                                                                    0
                                                                )
                                                            )
                                                        }
                                                    </span>
                                                    <button className='btn' onClick={() => SubtractTicket(ticket.Name)}>-</button>
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}
