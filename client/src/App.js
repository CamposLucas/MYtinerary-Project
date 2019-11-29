import React from 'react';
import './App.css';

import {Link} from 'react-router-dom';
import {Header, Menu} from './components/Components';
import Image from './components/Components';
import CarrouselPopular from './components/carrousel';
import {connect} from 'react-redux';
import {getCities} from './actions/cityActions'
// import PrivateRoute from './components/PrivateRoute';
// import Dashboard from './components/Dashboard';

// import jwt_decode from "jwt-decode";
// import setAuthToken from './components/setAuthToken';



// if (localStorage.jwtToken) {
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   const decoded
// }


class App extends React.Component {
  componentDidMount(){
    this.props.getCities();
  }
  render() {
    const {cities} = this.props.city;
    return (
        <div>
          <Menu />
          <Header />
          <div id="browsing">
            <h2>Start browsing</h2>
            <Link to="/cities"><Image url={require("./img/circled-right-2.png")} /></Link>
          </div>
          <h3 id= "subtitle">Popular MYtineraries</h3>
          <CarrouselPopular cit={cities}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  city: state.city
});



export default connect(mapStateToProps, {getCities})(App);
