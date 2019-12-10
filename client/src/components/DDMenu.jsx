import React from 'react';
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


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
          {this.props.icon.startsWith("icon") ?
            <DropdownToggle color="white" size='lg'>
              <i className={this.props.icon}></i>
            </DropdownToggle>
            :
            <DropdownToggle color="white" size='lg'>
              <img src={this.props.icon} className="userIcon"></img>
            </DropdownToggle>
          }
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

const mapStateToProps = (state) => ({
  auth: state.auth
})


export default connect(mapStateToProps)(DDMenu);