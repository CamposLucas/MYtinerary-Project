import React from 'react';
import {Menu} from './Components';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userName:'',
            password:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        axios.post('http://localhost:5000/user/login', this.state)
    }

  render(){
    return (
        <div className="loginDiv">
            <Menu />
            <h1>Log into your account</h1>
            <form action="" onSubmit={this.handleSubmit}>
                <label for="userName">Username</label>
                <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}/>

                <label for="password">Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <input type="submit"></input>
            </form>   
            <div>
                <button onClick={this.signGoogle}>Google</button>
            </div>
        </div>
    )  
  }
}

export default Login