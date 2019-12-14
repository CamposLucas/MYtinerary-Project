import React from 'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {getCities} from '../actions/cityActions';
import {Link} from 'react-router-dom';


class Cities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialCities:[],
      currentlyDisplayed:[]
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount(){
    this.setState({initialCities: this.props.city.cities, currentlyDisplayed: this.props.city.cities})
  }

  onInputChange = (event) => {
    let newlyDisplayed = this.state.initialCities;
    newlyDisplayed = newlyDisplayed.filter(city => {
      return city.name.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0;
    })
    this.setState({currentlyDisplayed: newlyDisplayed});
  }

  render(){

    return (
      <div>
        <Menu />
        <div id="filtro">
          <p>Filter our current cities:</p>
          <input placeholder="Buscar" onChange={this.onInputChange}></input>
        </div>
        <div className="citiesContainer">
          {this.props.city.loading ? <p>Loading cities...</p> : ''}
          {this.state.currentlyDisplayed.map((cities, i) =>
            <div className="citieList" key={i}>
              <img src={cities.img} alt={cities.name}></img>
              <Link to={`/itineraries/${cities._id}`}><p>{cities.name}</p></Link>
            </div>
          )}
        </div>
      </div>
    )  
  }
}


const mapStateToProps = (state) => ({
  city: state.city
});

export default connect(mapStateToProps, {getCities})(Cities);