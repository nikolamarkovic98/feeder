import React from 'react';
import './index.css';

import NavBox from './sub/NavBox';
import CreatePoll from './sub/Poll/CreatePoll';
import EditPoll from './sub/Poll/EditPoll';
import CreateMeal from './sub/Meal/CreateMeal';
import EditMeal from './sub/Meal/EditMeal';
import CreateRestaurant from './sub/Restaurant/CreateRestaurant';
import EditRestaurant from './sub/Restaurant/EditRestaurant';

const toggle = e => {
    const data = e.target.getAttribute('data-id');
    if(data !== null){
        // clear view
        const panelBoxs = document.querySelectorAll('.panel-box');
        for(let i = 0; i < panelBoxs.length; i++)
            panelBoxs[i].style.display = 'none';

        document.getElementById(data).style.display = 'block';
    }
}

const Admin = props => {
    return(
        <div className="admin">
            <div className="content-wrap">
                <nav onClick={toggle}>
                    <NavBox entity='Poll' />
                    <NavBox entity='Meal' />
                    <NavBox entity='Restaurant' />
                </nav>
                <div className="panel">
                    <CreatePoll />
                    <EditPoll />
                    <CreateMeal />
                    <EditMeal />
                    <CreateRestaurant />
                    <EditRestaurant />
                </div>
            </div>
        </div>
    )
}

export default Admin;