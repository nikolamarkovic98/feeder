import React, {useEffect} from 'react';

import './index.css';

const OrderItem = props => {
    return(
        <div className="order-item">
            <p className="user">Order by {props.user}</p>
            <div className="order">
                <h2>{props.quantity} {props.meal.title} {props.meal.description ? `- ${props.meal.description}` : ''}</h2>
                <p>{props.note}</p>
                <p className="price">Price: {props.orderPrice}</p>
            </div>
        </div>
    )
}

export default OrderItem;