import React, {useState, useEffect} from 'react';
import {find, create} from '../../../../../requests';
import {displayMessage, pollIntervals} from '../../../../../helpers';

import './index.css';

const createPoll = async (e, addedRestaurants) => {
    e.preventDefault();

    const name = (document.querySelector('#name').value).trim();
    const time = Number(document.querySelector('#time').value);

    const poll = {
        label: name,
        active: true,
        date: new Date().toISOString(),
        restaurants: addedRestaurants.map(r => r.id),
        votes: []
    }

    // create votes for each restaurant
    for(let i = 0; i < addedRestaurants.length; i++){
        try{
            const vote = await create('vote', {
                restaurantId: addedRestaurants[i].id,
                votes: 0
            });
            poll.votes.push(vote.id);
        } catch(err){
            console.log(err);
        }
    }

    let localPoll = {
        duration: time * 60 * 1000,
        passedTime: 0
    }
    
    // create poll
    try{
        const newPoll = await create('poll', poll);
        displayMessage('msg', 'Poll created!', 'green');
        localPoll.pollId = newPoll.id;
        console.log(newPoll);
    } catch (err){
        console.log(err);
    }

    // add to localStorage
    let localPolls = JSON.parse(localStorage.getItem('meal-app-polls'));
    if(localPolls === null)
        localPolls = [];

    // this code looks weird but it works
    if(localPolls.length === 0){
        localPolls.push(localPoll);
        localStorage.setItem('meal-app-polls', JSON.stringify(localPolls));
        pollIntervals();
    } else {
        localPolls.push(localPoll);
        localStorage.setItem('meal-app-polls', JSON.stringify(localPolls));
    }
}

const handleClick = e => {
    let data = e.target.getAttribute('data-id');
    if(data === 'rest-list'){
        document.querySelector('#restaurant-list').style.display = 'block';
    } else {
        document.querySelector('#restaurant-list').style.display = 'none';
    }
}

const removeRestaurant = (addedRestaurants, setAddedRestaurants, id) => {
    const i = addedRestaurants.map(r => r.id).indexOf(id);
    addedRestaurants.splice(i, 1);
    setAddedRestaurants([...addedRestaurants]);
}

const displayAvailableRestaurants = (availableRestaurants, addedRestaurants, setAddedRestaurants, filter) => {
    let restaurants = [];
    if(availableRestaurants.length !== 0){
        for(let i = 0; i < availableRestaurants.length; i++){
            let match = false;
            for(let j = 0; j < addedRestaurants.length; j++){
                if(availableRestaurants[i].id === addedRestaurants[j].id){
                    match = true;
                    break;
                }
            }
            if(match)
                continue;
            restaurants.push(availableRestaurants[i]);
        }
    }

    return restaurants.map(r => {
        if(r.name.toLowerCase().includes(filter.toLowerCase()))
            return(<li key={r.id} data-id="rest-list" onClick={e => setAddedRestaurants([...addedRestaurants, r])}>{r.name}</li>)
    })
}

const CreatePoll = props => {
    const [availableRestaurants, setAvailableRestaurants] = useState([]);
    const [addedRestaurants, setAddedRestaurants] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        async function wrapper(){
            const restaurants = await find('restaurant');
            setAvailableRestaurants(restaurants.data);
        }
        wrapper();
    }, []);

    return (
        <div className="create-poll panel-box wrapper active" id="Create Poll" onClick={handleClick}>
            <div className="pre-wrapper">
                <div className="wrapper">
                    <h1>Create Poll</h1>
                    <form>
                        <div className="form-box">
                            <input type="text" id="name" placeholder="Poll name" className="admin-input" />
                        </div>
                        <div className="restaurants">
                            <div className="added-restaurants">
                                {
                                    addedRestaurants.length === 0 ?
                                    'Empty'
                                    :
                                    addedRestaurants.map((r, index) => {
                                        return(
                                            <div className="added-restaurant" key={r.id}>
                                                <span>{r.name}</span>
                                                <span onClick={e => removeRestaurant(addedRestaurants, setAddedRestaurants, r.id)} className="remove">Remove</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="add-restaurant">
                                <ul>
                                    <li>
                                        <input type="text" onChange={e => setFilter(e.target.value)} data-id="rest-list"
                                        placeholder="Add Restaurant" autoComplete="off" id="restaurant-search" />
                                        <ul id="restaurant-list">
                                            {
                                                displayAvailableRestaurants(availableRestaurants, addedRestaurants, setAddedRestaurants, filter)
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="form-box">
                            <select id="time">
                                <option value="0.25">15sec</option>
                                <option value="0.5">30sec</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className="form-box">
                            <button className="admin-button" onClick={e => createPoll(e, addedRestaurants)}>Create Poll</button>
                        </div>
                    </form>
                    <p id="msg"></p>
                </div>
            </div>
        </div>
    )
}

export default CreatePoll;