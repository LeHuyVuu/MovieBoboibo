import React, { useState } from 'react';
import './BookingMovie.css';

import BookingFood from './BookingFood';
import BookingSeat from './BookingSeat';
import Total from './Total';
import { AvailableTime, TypeOfTicket } from './data';

export default function BookingMovie() {

    const [ChosenDay, setChosenDay] = useState(new Date().toLocaleString('en-US', { weekday: 'short' }));
    const [ChosenDate, setChosenDate] = useState(new Date().toISOString().split('T')[0]);
    const [ChosenTime, setChosenTime] = useState({ Time: AvailableTime[0].Time, Category: '' });

    const [Ticket, setTicket] = useState({
        Child: 0,
        Adult: 0,
        Couple: 0
    });

    const [ChosenSeat, setChosenSeat] = useState([]);
    const handleSeatChange = (seat) => {
        setChosenSeat(seat);
    };

    const [ChosenFood, setChosenFood] = useState([]);
    const handleFoodChange = (food) => {
        setChosenFood(food);
    };

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
        } else if (Name === 'Couple') {
            setTicket(prev => ({ ...prev, Couple: prev.Couple + 1 }));
        }
    }

    const SubtractTicket = (Name) => {
        if (ChosenSeat.length < Ticket.Child + Ticket.Adult + Ticket.Couple) {
            if (Name === 'Child' && Ticket.Child > 0) {
                setTicket(prev => ({ ...prev, Child: prev.Child - 1 }));
            } else if (Name === 'Adult' && Ticket.Adult > 0) {
                setTicket(prev => ({ ...prev, Adult: prev.Adult - 1 }));
            } else if (Name === 'Couple' && Ticket.Couple > 0) {
                setTicket(prev => ({ ...prev, Couple: prev.Couple - 1 }));
            }
        }
    }

    return (
        <div className='bookingmovie-container'>
            <h1>BOOKING MOVIE</h1>

            <form className='form-group'>
                <h2>Choose Theater</h2>
                <select>
                    <option value='' className='opt'>-- Choose Theater --</option>
                    <option value='cgv' className='opt'>CGV</option>
                    <option value='lotte' className='opt'>Lotte Cinema</option>
                    <option value='galaxy' className='opt'>Galaxy Cinema</option>
                    <option value='bhd' className='opt'>BHD Star Cineplex</option>
                </select>
            </form>

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
                                ))}
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

            <h2>Choose Type Of Ticket</h2>
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
                                            <button className='btn' onClick={() => SubtractTicket(ticket.Name)}>-</button>
                                            {ticket.Name === 'Child' ?
                                                <span style={{ backgroundColor: Ticket.Child !== 0 ? '#dc3545' : '' }}>{Ticket.Child}</span>
                                                :
                                                ticket.Name === 'Adult' ?
                                                    <span style={{ backgroundColor: Ticket.Adult !== 0 ? '#dc3545' : '' }}>{Ticket.Adult}</span>
                                                    :
                                                    ticket.Name === 'Couple' ?
                                                        <span style={{ backgroundColor: Ticket.Couple !== 0 ? '#dc3545' : '' }}>{Ticket.Couple}</span>
                                                        :
                                                        <span>0</span>
                                            }
                                            <button className='btn' onClick={() => AddTicket(ticket.Name)}>+</button>
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <BookingSeat
                total_ticket={Ticket.Child + Ticket.Adult + Ticket.Couple}
                onSeatChange={handleSeatChange}
            />

            <BookingFood
                onFoodChange={handleFoodChange}
            />

            <Total
                ticket={Ticket}
                chosen_seat={ChosenSeat}
                chosen_food={ChosenFood}
            />
        </div>
    )
}
