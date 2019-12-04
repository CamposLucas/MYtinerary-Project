import React from 'react';
import logo from '../img/MYtineraryLogo.png';
import { Link } from 'react-router-dom';
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown } from 'reactstrap';




export default class Image extends React.Component {
  constructor(){
    super()
    this.state = {url:""};
  }
  render(){
    return <img src={this.props.url} alt="not found"></img>
  }
}

export class Menu extends React.Component{
  render(){
    return (
      <div id="menu">
        <DDMenu icon="icon-user-circle-o" pages={["Login","Create Account"]} links={["/login", "/create-account"]} />
        <DDMenu icon="icon-menu" pages={["Home", "Cities"]} links={["/", "/cities"]}/>
      </div>
    )
  }
}

export class Header extends React.Component {
  render(){
    return (
        <div id="header">
          <Image url={logo}/>
          <p>Find your perfect trip, designed by insiders who know and love their cities</p>
        </div>
    )
  }
}


class DDMenu extends React.Component {
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }
  render() {
    this.toggle = this.toggle.bind(this);
    return (
      <div>
        <ButtonDropdown
          isOpen={this.state.btnLg}
          toggle={() => {
            this.setState({
              btnLg: !this.state.btnLg
            });
          }}
        >
          <DropdownToggle color="white" size='lg'>
            <i className={this.props.icon}></i>
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.pages.map((name, index) =>
              <DropdownItem>
                <Link to={this.props.links[index]}>{name}</Link>
              </DropdownItem>
            )}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}
