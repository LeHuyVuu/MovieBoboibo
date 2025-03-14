import React, { useEffect, useState } from 'react';
import './BookingFood.css';

import FoodPNG from './ComboFood.png';
import { ComboFood } from './data';

export default function BookingFood(props) {

    const [ChosenFood, setChosenFood] = useState([]);
    useEffect(() => {
        props.onFoodChange(ChosenFood);
    }, [ChosenFood]);

    const AddFood = (Id) => {
        setChosenFood(prev => [...prev, Id]);
    }

    const SubtractFood = (Id) => {
        const index = ChosenFood.findIndex(item => item === Id);
        if (index !== -1) {
            setChosenFood(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
        }
    }

    return (
        <div className='bookingfood-container'>
            <h2>Choose Combo</h2>
            {ComboFood.map((food, index) => (
                <div key={index} className='food-item'>
                    <div className='img-detail'>
                        <img src={FoodPNG} alt='ComboFood'></img>
                        <div className='detail'>
                            <h3>{food.Name}</h3>
                            <p>{food.Detail}</p>
                            <p>Price: {food.Price} VND</p>
                        </div>
                    </div>
                    <div className='button'>
                        <button className='btn' onClick={() => SubtractFood(food.Id)}>-</button>
                        <span style={{ backgroundColor: ChosenFood.filter(chosen => chosen === food.Id).length !== 0 ? '#dc3545' : '' }}>
                            {ChosenFood.filter(chosen => chosen === food.Id).length}
                        </span>
                        <button className='btn' onClick={() => AddFood(food.Id)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
