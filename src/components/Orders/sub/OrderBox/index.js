import React from 'react';
import {Link} from 'react-router-dom';
import {getDate} from '../../../../helpers';

import './index.css';

// I could like send request for restaurants and display msg like Order for {restaurant}

function OrderBox(props){
    return(
        <div className="order-box list-box">
            <Link to={`/orders/${props.id}`}>
                <h2>Order for {getDate(props.date)}</h2>
            </Link>
        </div>
    )
}

export default OrderBox;