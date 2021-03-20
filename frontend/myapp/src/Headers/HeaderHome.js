import React from 'react';
import {Link} from 'react-router-dom';

class HeaderHome extends React.Component{
    render(){
        return(
            <header id='header'>
                <Link to='/Home' id='imgHeader'><img src={`${process.env.PUBLIC_URL}/assets/images/iconHeader.png`} alt="logo"/></Link>
                <div>
                    <Link to='/Home'><h1>Accueil</h1></Link>
                    <Link to='/Profile'><h1>Mon compte </h1></Link>
                </div>
            </header>
        )
    }
}

export default HeaderHome;