import React from 'react'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <form method='post' target='/admin/login'>
                <label htmlFor='username'>Username</label><br/>
                <input type="text" id='username' name="username" /><br/>
                <label htmlFor='password'>Password</label><br/>
                <input type="password" id='password' name="password" /><br/>

                <input type="submit" value="Login" />
            </form>
        )
    }
}