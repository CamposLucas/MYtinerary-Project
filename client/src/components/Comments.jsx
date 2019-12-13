import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateComment, getComments} from '../actions/commentsActions'
import ShowComments from './showComments';

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value:'',
            comments: [],
            isEliminated: false,
            toUpdate: false,
            reload: true
        }

    }

    async componentDidUpdate(nextProps) {
        if(nextProps.comments.comments !== this.state.comments) {
            this.setState({reload: false})
            await this.props.getComments(this.props.id)
            await this.setState({comments: this.props.comments.comments})
            this.setState({reload: true})
        }
    }

    async componentDidMount(){
        await this.props.getComments(this.props.id)
        this.setState({comments: this.props.comments.comments})
    }

    render(){
        return (
            <div>
                <div>
                    {this.state.reload ? 
                        <div>
                            {this.state.comments.map((comment, i) => 
                                <ShowComments com={comment} index={i} id={this.props.id} />
                            )}
                        </div>  
                        :
                        <div></div>  
                    }
                </div>
            </div>
        )
    }
}

var mapStateToProps = (state) =>({
    auth: state.auth,
    comments: state.comments
})

export default connect(mapStateToProps, {updateComment, getComments})(Comment);