import React from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context';

import './index.css';

const Header = props => {
    return(
        <AuthContext.Consumer>
        {
            context => {
                return (
                    <header>
                        <div className="content-wrap">
                            <Link to="/" id="logo">feeder</Link>
                            <nav>
                                <ul>
                                    <li><Link to="/polls">Polls</Link></li>
                                    <li><Link to="/orders">Orders</Link></li>
                                    {
                                        context.user.username === 'admin' ?
                                        <li><Link to="/admin">Admin</Link></li>
                                        :
                                        <></>
                                    }
                                </ul>
                                {
                                    context.user.username === null ?
                                    <ul>
                                        <li><Link to="/signup">Sign Up</Link></li>
                                        <li><Link to="/signin">Sign In</Link></li>
                                    </ul>
                                    :
                                    <ul>
                                        <li>{context.user.username}</li>
                                        <li onClick={e => context.setUser({username: null})}>Sign Out</li>
                                    </ul>
                                }
                            </nav>
                        </div>
                    </header>
                )
            }
        }
        </AuthContext.Consumer>
    )
}

export default Header;