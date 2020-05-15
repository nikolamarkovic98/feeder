import React, {useEffect, useState} from 'react';
import {find, create} from '../../../../../requests';

import './index.css';

const displayRestaurants = (restaurants) => {
    return restaurants.map(r => 
        <option key={r.id} value={r.id}>{r.name}</option>)
}

const createMeal = async e => {
    e.preventDefault();
    
    const title = (document.querySelector('#title').value).trim();
    const available = document.querySelector('#status').value === 'true' ? true : false;
    const price = Number((document.querySelector('#price').value).trim());
    const restaurantId = Number(document.querySelector('#restaurant-id').value);
    
    // validation

    const meal = {
        title: title,
        available: available,
        price: price,
        restaurantId: restaurantId
    }

    try{
        const newMeal = await create('meal', meal);
    } catch(err){
        console.log(err);
    }
}

const CreateMeal = props => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        async function wrapper(){
            const res = await find('restaurant');
            setRestaurants([...res.data]);
        }
        wrapper();
    }, []);

    return (
        <div className="create-meal panel-box" id="Create Meal">
            <h1>Create Meal</h1>
            <form>
                <div className="form-box">
                    <select id="restaurant-id">
                        <option value="-1">Select restaurant</option>
                        {displayRestaurants(restaurants)}
                    </select>
                </div>
                <div className="form-box">
                    <input type="text" id="title" className="admin-input" placeholder="Meal title" />
                </div>
                <div className="form-box">
                    <select id="status">
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
                    </select>
                </div>
                <div className="form-box">
                    <input type="text" id="price" className="admin-input" placeholder="Meal price" />
                </div>
                <div className="form-box">
                    <button className="admin-button" onClick={createMeal}>Create Meal</button>
                </div>
            </form>
        </div>
    )
}

export default CreateMeal;