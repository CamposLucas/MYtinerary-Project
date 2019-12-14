import React from 'react';
import {getActivities} from '../actions/activitiesAction';
import {connect} from 'react-redux';
import Carrousel from './Activities-carrousel';

class Activity extends React.Component {
    constructor(){
        super();

        this.state = {
            value:'',
            activities: [],
        }
    }
      
    async componentDidMount(){
        await this.props.getActivities(this.props.id)
        this.setState({activities: this.props.activity.activities})
    }

    render(){
        return (
            <div id="carrouselAct">
                {this.props.activity.loading ? <p>Loading...</p> : 
                    <div>
                        <Carrousel act={this.state.activities} />
                    </div>
                }
            </div> 
        )
    }

}

const mapStateToProps = (state) => ({
     activity: state.activity,
     itinerary: state.itinerary,
});


export default connect (mapStateToProps,{getActivities})(Activity);