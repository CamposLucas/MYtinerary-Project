import React from 'react';
import './App.css';

import {Link} from 'react-router-dom';
import Menu from './components/Menu';
import Header from './components/Header';
import Image from './components/Image';
import CarrouselPopular from './components/carrousel';
import {connect} from 'react-redux';
import {getCities} from './actions/cityActions'


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
