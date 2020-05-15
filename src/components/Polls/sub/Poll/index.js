import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {get, update} from '../../../../requests';
import {displayMessage, getDate} from '../../../../helpers';
import MyContext from '../../../../context';

import './index.css';

const voteRestaurant = async (poll, setPoll, restaurantId, vote, user) => {
    if(user.username !== null){
        if(poll.active){
            const {votes} = poll;
            const voteIndex = getVoteIndex(votes, restaurantId);
            try{
                const result = await update('vote', {...votes[voteIndex], votes: votes[voteIndex].votes+vote}, votes[voteIndex].id);
                let i = 0;
                for(; i < poll.votes.length; i++){
                    if(poll.votes[i].id === result.id){
                        break;
                    }
                }
                poll.votes[i] = result;
                setPoll({...poll});
            } catch(err){
                console.log(err);
            }
        } else {
            // poll.active could be null but Ill treat it as false
            displayMessage('msg', 'Poll is over, you are late again you late person!', 'red');
        }
    } else {
        displayMessage('msg', 'You need to be logged in to vote!', 'red');
    }
}

const getVoteIndex = (votes, restaurantId) => {
    return votes.map(vote => vote.restaurantId).indexOf(restaurantId);
}

const displayRestaurants = (poll, setPoll, user) => {
    return poll.restaurants.map(r => {
        return(
            <div key={r.id} className="restaurant">
                <h2>{r.name}</h2>
                { r.address !== undefined && <p>Address: {r.address}</p>}
                <p>Vote: {poll.votes[getVoteIndex(poll.votes, r.id)].votes}</p>
                <button onClick={e => voteRestaurant(poll, setPoll, r.id, 1, user)}>Like</button>
                <button onClick={e => voteRestaurant(poll, setPoll, r.id, -1, user)}>Dislike</button>
            </div>
        )
    })
}

const Poll = props => {
    const [poll, setPoll] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        async function wrapper(){
            const _poll = await get('poll', id);
            console.log(_poll);
            setPoll(_poll);
        }
        wrapper();
    }, []);

    return(
        <><MyContext.Consumer>
        {
            context => {
                return (
                    poll &&
                    <div className="poll">
                        <h1>{poll.label} - {getDate(poll.date)}</h1>
                        <p id={`poll-${id}`}></p>
                        <div className="pre-wrapper">
                            <div className="restaurant-list">
                                {displayRestaurants(poll, setPoll, context.user)}
                            </div>
                        </div>
                        <p id="msg"></p>
                    </div>
                )
            }
        }
        </MyContext.Consumer></>
    )
}

export default Poll;