import React from 'react';

const NavBox = props => {
    return (
        <ul className="nav-box">
            <li className="nav-box-main-li">
                <span>{props.entity}</span>
                <ul>
                    <li data-id={`Create ${props.entity}`}>Create {props.entity}</li>
                    <li data-id={`Edit ${props.entity}`}>Edit {props.entity}</li>
                </ul>
            </li>
        </ul>
    )
}

export default NavBox;