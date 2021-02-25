import {React, Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchStream, editStream} from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        //console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render(){
        //console.log(this.props.stream.title);
        if(!this.props.stream){
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h3>Edit a stream</h3>
                    <StreamForm
                        initialValues={_.pick(this.props.stream, 'title', 'description')}
                        onSubmit={this.onSubmit}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
   return {
       stream: Object.values(state.streams).find(stream => stream.id === parseInt(ownProps.match.params.id))
   }
};

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
