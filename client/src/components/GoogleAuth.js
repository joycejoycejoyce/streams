import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {

    
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: 
                "755684894337-9g7fqh92112f31n5bqne36nbt6mpleeb.apps.googleusercontent.com",
                scope: "email"
            }).then(()=>{
                 this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }
    

    onAuthChange = (isSignedIn) =>{
        const self = this;
        if(isSignedIn){
            this.props.signIn(self.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    };

    onSignIn = () =>{
        this.auth.signIn();
    }

    onSignOut = () =>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null;
        }else if (this.props.isSignedIn === true){
            return (
                <button className="ui red google button" onClick={this.onSignOut}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        }else{
            return (
            <button className="ui red google button" onClick={this.onSignIn}>
                    <i className="google icon"></i>
                    Sign In
                </button>
            );
        }

    }

    render(){
        return<div>
            {this.renderAuthButton()}
        </div>
    }
}

const mapStateToProps = (state) =>{
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);