import React from 'react';
import AuthContext from '../../context';

const handleSignIn = (e, context) => {
    e.preventDefault();

    const username = (document.querySelector('#username').value).trim();
    const password = (document.querySelector('#password').value).trim();

    const users = JSON.parse(localStorage.getItem('meal-app-users'));

    if(users === null)
        console.log('Wrong input');

    let match = false, index = 0;
    for(; index < users.length; index++){
        if(users[index].username === username && users[index].password === password){
            match = true;
            break;
        }
    }

    if(match){
        context.setUser(users[index]);
    } else {
        console.log('Wrong input');
    }
}

const SignIn = props => {
    return(
        <AuthContext.Consumer>
        {
            context => {
                return (
                    <div className="pre-wrapper">
                        <div className="signin">
                            <h1>SignIn</h1>
                            <form>
                                <div className="form-box">
                                    <input type="text" id="username" className="admin-input" placeholder="Username" />
                                </div>
                                <div className="form-box">
                                    <input type="text" id="password" className="admin-input" placeholder="Password" />
                                </div>
                                <button onClick={e => handleSignIn(e, context)} className="admin-button">Click Me</button>
                            </form>
                        </div>
                    </div>
                )
            }
        }
        </AuthContext.Consumer>
    )
}

export default SignIn;