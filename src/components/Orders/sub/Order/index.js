import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { get, find } from '../../../../requests';
import {NVD3Chart} from 'react-nvd3';

import './index.css';
import OrderItem from './sub/OrderItem';

const exportToExcel = e => {
    console.log('exporting');
}

const displayOrderItems = orderItems => {
    if(orderItems.length === 0){
        return (<h1>There are no orders, yet!</h1>)
    }
    return orderItems.map(item => {
        return(
            <OrderItem key={item.id} id={item.id} mealId={item.mealId} orderId={item.orderId} orderPrice={item.orderPrice}
            meal={item.meal} user={item.user} quantity={item.quantity} note={item.note} />
        )
    })
}

const filterFetchedOrderItems = (items, orderId) => {
    return new Promise((resolve, reject) => {
        let orderItems = [];
        items.forEach((item, i, arr) => {
            if(item.orderId === orderId){
                orderItems.push(item);
            }
            if(arr.length-1 === i){
                resolve(orderItems)
            }
        });
    });
}

function Order(props){
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        async function wrapper(){
            const fetchedOrder = await get('order', id);
            let fetchedOrderItems = await find('order-item');
            let filteredFetchedOrderItems = await filterFetchedOrderItems(fetchedOrderItems.data, fetchedOrder.id)

            // get meals
            console.log(filteredFetchedOrderItems);
            let total = 0;
            for(let i = 0; i < filteredFetchedOrderItems.length; i++){
                filteredFetchedOrderItems[i].meal = await get('meal', filteredFetchedOrderItems[i].mealId);
                const orderItemPrice = filteredFetchedOrderItems[i].meal.price * filteredFetchedOrderItems[i].quantity
                total += orderItemPrice;
                filteredFetchedOrderItems[i].orderPrice = orderItemPrice;
            }

            fetchedOrder.totalPrice = total;

            setOrder(fetchedOrder);
            setOrderItems([...filteredFetchedOrderItems]);
        }
        wrapper();
    }, []);

    return(
        <>
        {
            order &&
            <div className="order">
                <div className="pre-wrapper">
                    <div className="order-list">
                        <Link to={`/order-food/${id}`} className="order-btn">Order food</Link>
                        {
                            <div className="cart">
                                <span>Total price:</span>
                                <span>{order.totalPrice} dinara</span>
                            </div>
                        }
                        {displayOrderItems(orderItems)}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Order;