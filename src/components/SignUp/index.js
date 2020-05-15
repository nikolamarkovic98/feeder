import React from 'react';
import AuthContext from '../../context';

const handleSignUp = (e, context) => {
    e.preventDefault();

    const username = (document.querySelector('#username').value).trim();
    const password = (document.querySelector('#password').value).trim();

    let users = JSON.parse(localStorage.getItem('meal-app-users'));

    const user = {
        username: username,
        password: password
    }
    if(users === null){
        users = [];
    }
    users.push(user)
    localStorage.setItem('meal-app-users', JSON.stringify(users));
}

const SignUp = props => {
    return(
        <AuthContext.Consumer>
        {
            context => {
                return (
                    <div className="signup">
                        <h1>SignUp</h1>
                        <form>
                            <div className="form-box">
                                <input type="text" id="username" className="admin-input" placeholder="Username" />
                            </div>
                            <div className="form-box">
                                <input type="text" id="password" className="admin-input" placeholder="Password" />
                            </div>
                            <button onClick={e => handleSignUp(e, context)} className="admin-button">Click Me</button>
                        </form>
                    </div>
                )
            }
        }
        </AuthContext.Consumer>
    )
}

export default SignUp;