import React from 'react';
import './signup.css';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
        }

        // Contrôle de la valeur des this
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Méthodes 'handle...' permettant de récupérer les informations passées par l'utilisateur
    handleFirstNameChange(e){
        this.setState({
            firstName : e.target.value
        });
    };

    handleLastNameChange(e){
        this.setState({
            lastName : e.target.value
        });
    };

    handleEmailChange(e){
        this.setState({
            email : e.target.value
        });
    };

    handlePasswordChange(e){
        this.setState({
            password : e.target.value
        });
    };

    // Méthode permettant de s'assurer de la remise à zéro du formulaire
    resetForm() {
        this.setState({
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            redirection: false,
        });
    }

    // Envoi à l'API des informations nécessaire à la création du compte de l'utilisateur
    handleSubmit(click){
        click.preventDefault();

        const submitData = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password
        };

        fetch('http://localhost:5000/api/auth/signup',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(submitData)
        })

        .then(() =>{
            window.location = './'
        })
        
        .catch(err=> {
            console.log('err', err);
            alert(err.error);
            this.resetForm();
        })
    }

    render(){
        return(
            <>
                <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo" id='logo'/>
                <form>
                    <label for='firstName'>
                        <input type='text' id='firstName' name='firstName' value={this.state.firstName} onChange={this.handleFirstNameChange} placeholder='Prénom' required></input>
                    </label>
                    <label for='lastName'>
                        <input type='text' id='lastName' name='lastName' value={this.state.lastName} onChange={this.handleLastNameChange} placeholder='Nom' required></input>
                    </label>
                    <label for='email'>
                        <input type='email' id='email' name='email' value={this.state.email} onChange={this.handleEmailChange} placeholder='Adresse e-mail' required></input>
                    </label>
                    <label for='password'>
                        <input type='password' id='password' name='password' value={this.state.password} onChange={this.handlePasswordChange} placeholder='Mot de passe' required></input>
                    </label>
                    <button type='submit' onClick={this.handleSubmit}>Inscription</button>
                </form>
            </>
        )
    };
};

export default Signup;