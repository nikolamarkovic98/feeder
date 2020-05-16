import React from 'react';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import AuthContext from './context';
import {pollIntervals} from './helpers';

import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Polls from './components/Polls';
import Poll from './components/Polls/sub/Poll';
import Orders from './components/Orders';
import Order from './components/Orders/sub/Order';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Admin from './components/Admin';
import OrderFood from './components/OrderFood';

const showAdminPanel = user => {
    if(user !== undefined){
        if(user.username === 'admin')
            return (<Route path="/admin" component={Admin} />)
    }
}

// razlog zbog kojeg su sve komponente funkcionalne je taj sto sam u prethodnim projektima koristio uglavnom klasne komponente
// pa sam zbog toga ovu app hteo da napravim sa funkcijama

const App = props => {
    const [user, setUser] = useState({username: null});

    useEffect(() => {
        pollIntervals();
    }, []);

    return (
        <AuthContext.Provider value={{user: user, setUser: setUser, pollInterval: null}}>
            <Router>
                <div className="app">
                    <Header />
                    <main>
                        <Switch>
                            { user.username !== null && <Redirect from="/signin" to="/polls" /> }
                            { user.username !== null && <Redirect from="/signup" to="/polls" /> }
                            { user.username === null && <Redirect from="/order-food" to="/signin" /> }
                            <Route path="/" exact component={Home} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/signin" component={SignIn} />
                            <Route path="/polls/:id" component={Poll} />
                            <Route path="/polls" component={Polls}  />
                            <Route path="/orders/:id" component={Order} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/order-food/:id" component={OrderFood} />
                            {
                                showAdminPanel(user)
                            }
                        </Switch>
                    </main>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;