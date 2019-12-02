import React from 'react';

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions';
import PropTypes from 'prop-types'

import {googleSign} from '../actions/authActions';

class Login extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const {token} = this.props.match.params;

        this.props.googleSign(token);
        this.props.history.push("/dashboard")

    }

    render(){

        return (
            <div>
                <p>Redirecting...</p>
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
})

export default connect(mapStateToProps, { googleSign })(withRouter(Login))