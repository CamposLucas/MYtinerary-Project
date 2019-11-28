import React from 'react';
import {Menu} from './Components';
import axios from 'axios';
import GoogleButton from 'react-google-button';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username:'',
            password:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signGoogle = this.signGoogle.bind(this);
    }

    signGoogle(){
        window.location.href = 'http://localhost:5000/auth/google';
    }

    handleChange(event) {
        var state = this.state;
        state[event.target.name] = event.target.value; 
        this.setState({state})
    }

    handleSubmit(event) { 
        event.preventDefault();

        axios.post('http://localhost:5000/users/login', this.state)
    }


  render(){
    return (
        <div className="loginDiv">
            <Menu />
            <h1>Log into your account</h1>
            <GoogleButton onClick={this.signGoogle} className="googleSign" />  
            <p>or</p>
            <form action="" onSubmit={this.handleSubmit}>
                <label for="username">Username</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>

                <label for="password">Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                
                <input type="submit" value="Login"></input>
            </form>         
        </div>
    )  
  }
}

export default Login