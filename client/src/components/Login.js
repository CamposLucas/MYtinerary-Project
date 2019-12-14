import React from 'react';

import Menu from './Menu';
import GoogleButton from 'react-google-button';


import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions';

class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            username:'',
            password:'',
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signGoogle = this.signGoogle.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard")
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.auth.isAuthenticated)

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard")
        }

        if(nextProps.auth.errors) {
            this.setState({errors: nextProps.auth.errors})
        }
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

        const userData = {
            username:  this.state.username,
            password: this.state.password
        }
        this.props.loginUser(userData);

    }


  render(){
    return (
        <div className="loginDiv">
            <Menu />
            <h1>Log into your account</h1>
            <form action="" onSubmit={this.handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                <span className="validateSpan">
                    {this.state.errors.username}
                </span>

                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <span className="validateSpan">
                    {this.state.errors.password}
                </span>    

                <input type="submit" value="Login"></input>
            </form>      
            <p>or</p>
            <GoogleButton onClick={this.signGoogle} className="googleSign" />     
        </div>
    )  
  }
}


const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { loginUser })(Login)