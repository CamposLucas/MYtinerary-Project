import React from 'react';

import {Menu} from './Components';
import GoogleButton from 'react-google-button';

import {withRouter} from 'react-router-dom';

import axios from 'axios';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';

import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions';
import PropTypes from 'prop-types'

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAunthenticated) {
            this.props.history.push("/dashboard")
        }
        console.log(this.props.auth)


        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
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
            <GoogleButton onClick={this.signGoogle} className="googleSign" />  
            <p>or</p>
            <form action="" onSubmit={this.handleSubmit}>
                <label for="username">Username</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                <span className="validateSpan">
                    {this.state.errors.username}
                </span>

                <label for="password">Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <span className="validateSpan">
                    {this.state.errors.password}
                </span>    

                <input type="submit" value="Login"></input>
            </form>         
        </div>
    )  
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))