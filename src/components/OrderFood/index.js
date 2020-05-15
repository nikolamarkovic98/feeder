import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { get, find, create } from '../../requests';
import {displayMessage} from '../../helpers';

import MyContext from '../../context';

import './index.css';

const orderFood = async (e, orderId, username) => {
    const quantity = Number((document.querySelector('#quantity').value).trim());
    const note = (document.querySelector('#note').value).trim();
    // when I create slideshow Ill have to have state for selected meal or smthn like that
    const mealId = Number(document.querySelector('#selected-meal').value);

    const orderItem = {
        quantity: quantity,
        note: note,
        mealId: mealId,
        orderId: Number(orderId),
        user: username
    }

    const createdOrderItem = await create('order-item', orderItem);
    displayMessage('msg', 'You successfuly ordered food!', 'green');
    console.log(createdOrderItem)
}

const getMealOptions = meals => {
    return meals.map(meal => {
        if(meal.available)
            return(<option key={meal.id} value={meal.id}>{meal.title}</option>)
    });
}

const filterMeals = (_meals, restaurantId) => {
    return new Promise((resolve, reject) => {
        let meals = [];
        _meals.forEach((meal, i, arr) => {
            if(meal.restaurantId === restaurantId){
                meals.push(meal);
            }
            if(arr.length-1 === i){
                resolve(meals);
            }
        })
    })
}

const OrderFood = props => {
    const [meals, setMeals] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        async function wrapper(){
            const order = await get('order', id);
            const restaurant = await get('restaurant', order.restaurantId);
            const {data} = await find('meal');
            setMeals([...await filterMeals(data, restaurant.id)]);
        }
        wrapper();
    }, []);
    
    return(
        <MyContext.Consumer>
        {
            context => {
                return(
                    <div className="order-food">
                        <div className="content-wrap">
                            <h1>Order food</h1>
                            <div className="form-box">
                                <select id="selected-meal">
                                    <option value="">Select food</option>
                                    {getMealOptions(meals)}
                                </select>
                            </div>
                            <div className="form-box">
                                <input type="text" id="quantity" placeholder="Quantity" className="admin-input" />
                            </div>
                            <div className="form-box">
                                <textarea id="note" placeholder="Note"></textarea>
                            </div>
                            <div className="form-box">
                                <button onClick={e => orderFood(e, id, context.user.username)} className="admin-button">Order Food</button>
                            </div>
                            <p id="msg"></p>
                        </div>
                    </div>
                )
            }
        }
        </MyContext.Consumer>
    )
}

export default OrderFood;