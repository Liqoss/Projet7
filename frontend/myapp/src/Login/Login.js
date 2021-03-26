import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            connected : false
        }
        
        // Contrôle de la valeur des this
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    // Stockage dans le state de la valeur de l'input email
    handleEmailChange(e){
        this.setState({
            email : e.target.value
        })
    }

    // Stockage dans le state de la valeur de l'input mot de passe
    handlePasswordChange(e){
        this.setState({
            password : e.target.value
        })
    }

    // Envoi dà l'API des informations nécessaire à la connexion de l'utilisateur 
    handleSubmit(click){
        click.preventDefault();

        const submitData = {
            email : this.state.email, 
            password : this.state.password
        };

        console.log(submitData)

        fetch('http://localhost:5000/api/auth/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify(submitData)
        })
        .then(response => response.json())
        .then(async (response) => {
                this.setState({connected : true});
                localStorage.setItem('token', response.token)
                localStorage.setItem('userId', response.userId)
        })
        .catch(err => {
            console.log('err', err)
            alert(err=> {
                console.log('err', err);
                alert(err.error);
            })
        })
    }

    render(){
        const {connected} = this.state;
        if (connected){
            return <Redirect to='./Home' />;
        }
        return(
            <>
                <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="logo" id='logo'/>
                <form>
                    <div>
                        <input type='email' name='email' id='emailLogin' placeholder='E-mail' onChange={this.handleEmailChange} required></input>
                    </div>
                    <div>
                        <input type='password' name='password' id='passwordLogin' placeholder='Mot de passe' onChange={this.handlePasswordChange} required></input>
                    </div>
                    <button type='submit' onClick={this.handleSubmit}>Connexion</button>
                </form>
            </>
        )
    }
}

export default Login;