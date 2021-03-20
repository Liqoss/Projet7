import React from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accountDeleted : false,
            profile : []
        }

        this.getProfile = this.getProfile.bind(this);
        this.handleSignout = this.handleSignout.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.getProfile();
    }

    handleSignout(click){
        click.preventDefault()
        localStorage.clear()
        window.location = './'
    }

    handleDelete(click){
        // eslint-disable-next-line no-restricted-globals
        const submitData = {
            id : localStorage.getItem('userId')
        }
        if ( window.confirm('Voulez-vous vraiment supprimer votre compte ?')){
            fetch('http://localhost:5000/api/auth/delete',{
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body : JSON.stringify(submitData)
            })
            .then(async (response) => {
                localStorage.clear()
                this.setState({accountDeleted : true})
            })
            .catch(err => {
                console.log('err', err);
                alert(err.error)
            })
        }
    }

    getProfile(){
        fetch('http://localhost:5000/api/auth/' + localStorage.getItem('userId'),{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(profile => profile.json())
        .then(profile => {
            this.setState({profile})
        })
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
        })
    }

    render(){
        const {accountDeleted} = this.state;
        if (accountDeleted){
            return <Redirect to='./' />;
        }
       return(
           <>
           <div id='divProfile'> 
                    <h1>Prénom : <span>{this.state.profile.firstName}</span></h1>
                    <h1>Nom : <span>{this.state.profile.lastName}</span></h1>
                    <h1>E-mail : <span>{this.state.profile.email}</span></h1>
                <button onClick={this.handleSignout}>Déconnexion</button> 
           </div>
           <div id='divDelete'>
               <h1 onClick={this.handleDelete}>Supprimer mon compte</h1>
           </div>
           </>
       ) 
    }
}

export default Profile;