import React from 'react';
import {create} from '../../../../../requests';
import {displayMessage} from '../../../../../helpers';

const createRestaurant = async e => {
    e.preventDefault();

    const name = (document.querySelector('#restaurant-name').value).trim();
    const address = (document.querySelector('#address').value).trim();

    // validation

    const restaurant = {
        name: name,
        address: address
    }

    console.log(restaurant);

    const createdRestaurant = await create('restaurant', restaurant);
    if(createdRestaurant){
        displayMessage('msg', 'Restaurant created!', 'green');
    }
    console.log(createdRestaurant);
}

const CreateRestaurant = props => {
    return (
        <div className="create-restaurant panel-box" id="Create Restaurant">
            <h1>Create Restaurant</h1>
            <form>
                <div className="form-box">
                    <input type="text" id="restaurant-name" className="admin-input" placeholder="Restaurant name" />
                </div>
                <div className="form-box">
                    <input type="text" id="address" className="admin-input" placeholder="Restaurant address" />
                </div>
                <div className="form-box">
                    <button className="admin-button" onClick={createRestaurant}>Create Meal</button>
                </div>
            </form>
            <p id="msg"></p>
        </div>
    )
}

export default CreateRestaurant;