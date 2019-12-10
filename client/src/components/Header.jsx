import React from 'react';
import logo from '../img/MYtineraryLogo.png';
import Image from './Image';

class Header extends React.Component {
  render(){
    return (
        <div id="header">
          <Image url={logo}/>
          <p>Find your perfect trip, designed by insiders who know and love their cities</p>
        </div>
    )
  }
}

export default Header;