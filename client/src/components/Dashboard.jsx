import React from "react";
import {Menu} from './Components';

class Dashboard extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <Menu />
        <h1>Welcome usuario</h1>
      </div>
    )
  }
}

export default Dashboard;