import React from 'react';

class Image extends React.Component {
  constructor(){
    super()
    this.state = {url:""};
  }
  render(){
    return <img src={this.props.url} alt="not found"></img>
  }
}

export default Image




