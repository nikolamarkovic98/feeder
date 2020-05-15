import React, {useEffect, useState} from 'react';
import {find, remove} from '../../../../../requests';

import './index.css';

const removePoll = async (id, polls, setPolls, setSelectedPoll) => {
    try{
        const removedPoll = await remove('poll', id);
        const pollIndex = polls.map(poll => poll.id).indexOf(id);
        polls.splice(pollIndex, 1);
        setPolls([...polls]);
        setSelectedPoll(null);
    } catch(err){
        console.log(err);
    }
}

const selectPoll = (e, poll, setSelectedPoll) => {
    const editPollBoxs = document.querySelectorAll('.edit-poll-box');
    for(let i = 0; i < editPollBoxs.length; i++)
        editPollBoxs[i].style.backgroundColor = 'inherit';
    e.target.style.backgroundColor = 'rgb(116, 49, 63, 0.2)';
    setSelectedPoll(poll);
}

const displayPolls = (polls, setSelectedPoll) => {
    return polls.map(poll => {
        return(
            <div className="edit-poll-box" key={poll.id} onClick={e => selectPoll(e, poll, setSelectedPoll)}>
                {poll.label === undefined ? 'No name' : poll.label}
                {/*<span onClick={e => removePoll(poll.id, polls, setPolls)}>Remove</span>*/}
            </div>
        )
    })
}

const editPoll = e => {
    console.log('Edit');
}

const EditPoll = props => {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);

    useEffect(() => {
        async function wrapper(){
            const allPolls = await find('poll');
            setPolls([...allPolls.data]);
        }
        wrapper();
    }, []);

    return (
        <div className="edit-poll panel-box" id="Edit Poll">
            <h1>Select the poll that you'd like to edit</h1>
            <div className="edit-poll-list">
            {
                polls.length === 0 ?
                <p>Empty</p>
                :
                displayPolls(polls, setSelectedPoll)
            }
            </div>
            {
                selectedPoll &&
                <div className="pre-wrapper">
                    <div className="selected-poll">
                        <h2>Edit</h2>
                        <div className="form-box">
                            <input type="text" id="name" placeholder={selectedPoll.label} className="admin-input"/>
                        </div>
                        <div className="form-box">
                            <button onClick={editPoll} className="admin-button">Save</button>
                        </div>
                        <div className="form-box">
                            <button className="admin-button remove" onClick={e => removePoll(selectedPoll.id, polls, setPolls, setSelectedPoll)}>Delete poll</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditPoll;