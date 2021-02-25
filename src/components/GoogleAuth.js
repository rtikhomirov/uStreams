import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from "../actions";

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId : '603414715457-68co48hqbm1sootjothrmjin0253enfu.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
       Boolean(isSignedIn) ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();
    };

    handleAuthClick = () => {
        this.auth.isSignedIn.get() ? this.auth.signOut() : this.auth.signIn();
    };

    renderAuthButton = () => {
        if(this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className='ui red google button'
                    onClick={this.handleAuthClick}
                >
                    <i className='google icon'/>
                    Sign out
                </button>
            )
        } else {
            return (
                <button
                    className='ui red google button'
                    onClick={this.handleAuthClick}
                >
                    <i className='google icon'/>
                    Sign in with Google
                </button>
            )
        }
    };

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);