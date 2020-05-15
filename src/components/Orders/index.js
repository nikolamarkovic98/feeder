import React, {useEffect, useState} from 'react';
import {find} from '../../requests';

import OrderBox from './sub/OrderBox';

const displayOrders = orders => {
    return orders.map(order => {
        return(
            <OrderBox key={order.id} id={order.id} date={order.date} restaurantId={order.restaurantId} />
        )
    })
}

const Orders = props => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function wrapper(){
            const orders = await find('order');
            setOrders([...orders.data]);
        }
        wrapper();
    }, []);

    return (
        <section className="orders">
            <div className="content-wrap">
                <h1>A list of all orders from the beginning of time</h1>
                <div className="list">
                    {displayOrders(orders)}
                </div>
            </div>
        </section>
    )
}

export default Orders;