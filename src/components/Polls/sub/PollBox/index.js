import React from 'react';
import {Link} from 'react-router-dom';
import {getDate} from '../../../../helpers';

import './index.css';

const activeText = active => {
    if(active)
        return 'Active!';
    return 'Over!';
}

const PollBox = props => {
    return (
        <div className="poll-box list-box">
            <Link to={`/polls/${props.id}`}>
                <h2>{props.name}</h2>
                <p className="date">{getDate(props.date)}</p>
                <p id={`poll-${props.id}`}></p>
                <div className={`active ${props.active ? 'green' : 'red'}`}>{activeText(props.active)}</div>
            </Link>
        </div>
    )
}

export default PollBox;