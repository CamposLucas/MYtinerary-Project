import React from 'react';
import Menu from './Menu';
import axios from 'axios';
import {connect} from 'react-redux'

class Create extends React.Component {
  constructor(){
    super()

    this.state={
      picture:null,
      username: '',
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      country:'',
      terms: false,
      errors:{}
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard")
    }
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  imgUpload(event){
    console.log(event.target.files[0]);
    this.setState({picture: event.target.files[0]})
  }

  handleSubmit(event){
    var user = this.state
    event.preventDefault();   

    axios.post('http://localhost:5000/users/register', user)
      .then(res => {
        alert(res.data)
        window.location.href = 'http://localhost:3000/login'
      })
      .catch(err => {
        this.setState({errors: err.response.data})
        console.log(this.state.errors)
      })
  }

  handleCheckbox(event){
    this.setState({[event.target.name]: event.target.checked})
  }

  handleClick(){
    var enteredName = prompt("url img: ")

    this.setState({picture: enteredName})
  }

  render(){
    const countryList = ["Choose a country",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua & Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "China - Hong Kong / Macau",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, Democratic Republic of (DRC)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "Gabon",
    "Gambia, Republic of The",
    "Georgia",
    "Germany",
    "Ghana",
    "Great Britain",
    "Greece",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel and the Occupied Territories",
    "Italy",
    "Ivory Coast (Cote d'Ivoire)",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Korea, Democratic Republic of (North Korea)",
    "Korea, Republic of (South Korea)",
    "Kosovo",
    "Kuwait",
    "Kyrgyz Republic (Kyrgyzstan)",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar/Burma",
    "Namibia",
    "Nepal",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia, Republic of",
    "Norway",
    "Oman",
    "Pacific Islands",
    "Pakistan",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovak Republic (Slovakia)",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Netherlands",
    "Timor Leste",
    "Togo",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks & Caicos Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United States of America (USA)",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (UK)",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
   "Zimbabwe",];

    return (
      <div>
        <Menu />
        <h1>Join Mytinerary!</h1>
        <form className="create-form" onSubmit={this.handleSubmit} noValidate>
          <div className="add-photo">
            <label>Profile picture:</label>
            <input type="file" onChange={this.imgUpload}></input>
          </div>

          <label for="username">Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
          <span className="validateSpan">
            {this.state.errors.username}
          </span>

          <label for="email">Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange}></input>
          <span className="validateSpan">
            {this.state.errors.email}
            {this.state.errors.emailnotfound}
          </span>

          <label for="password">Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
          <span className="validateSpan">
            {this.state.errors.password}
          </span>

          <label for="firstName">First Name:</label>
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}></input>
          <span className="validateSpan">
            {this.state.errors.firstName}
          </span>

          <label for="lastName">Last Name:</label>
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}></input>
          <span className="validateSpan">
            {this.state.errors.lastName}
          </span>

          <label for="country">Country:</label>
          <select name="country" value={this.state.value} onChange={this.handleChange}>
            {countryList.map(country => 
                <option value={country}>{country}</option>
              )}
          </select>
          <span className="validateSpan">
            {this.state.errors.country}
          </span>

          <div className="conditions">
            <input type="checkbox" name="terms" value={this.state.value} onChange={this.handleCheckbox}></input>
            <p>I agree to MYtinerary <a href="www.url.com">terms & conditions</a></p>
          </div>
          
          <input type="submit" value="Create account"
            disabled={!this.state.terms}
          /> 
        </form>
      </div>
    )  
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Create)