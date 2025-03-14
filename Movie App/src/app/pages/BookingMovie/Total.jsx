import React from 'react'
import './Total.css';

import { TypeOfTicket } from './data';

export default function Total(props) {
    const Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const Ticket = props.ticket;
    const ChosenSeat = props.chosen_seat;
    const ChosenFood = props.chosen_food;

    return (
        <div className='total-booking-container'>
            <div className='detail'>
                <div className='name'>
                    {Object.entries(Ticket).map(([ticketType, quantity]) => (
                        quantity > 0 && (
                            <p key={ticketType}>{ticketType} Ticket <span>x{quantity}</span> ({TypeOfTicket.find(t => t.Name === ticketType)?.Price} VND)</p>
                        )
                    ))}
                    <p>Seat: {
                        ChosenSeat.length > 0 ?
                            ChosenSeat.map((seat, index) => (
                                <span key={index}>
                                    <span key={index}>{Alphabet[seat[0]]}{seat[1] + 1}</span>
                                    {index < ChosenSeat.length - 1 && <span>, </span>}
                                </span>
                            ))
                            :
                            'NONE'
                    }
                    </p>

                    <p>Food: {
                        ChosenFood.length > 0 ?
                            ChosenFood.map((seat, index) => (
                                <span key={index}>
                                    <span key={index}>{Alphabet[seat[0]]}{seat[1] + 1}</span>
                                    {index < ChosenFood.length - 1 && <span>, </span>}
                                </span>
                            ))
                            :
                            'NONE'
                    }
                    </p>
                </div>

                <div className='price'>
                    {Object.entries(Ticket).map(([ticketType, quantity]) => {
                        const ticketPrice = TypeOfTicket.find(t => t.Name === ticketType)?.Price || 0;
                        return quantity > 0 && (
                            <p key={ticketType}>{quantity * ticketPrice} VND</p>
                        )
                    })}
                </div>
            </div>

            <div className='total-amount'>
                <p>Total: <span></span></p>
                <button className='btn'>SUBMIT</button>
            </div>
        </div >
    )
}
