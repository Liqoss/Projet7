import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Header from './Headers/Header';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import PostDetails from './PostDetails/PostDetails';
import HeaderHome from './Headers/HeaderHome';

function App() {

  return (
    <Router>

      <>
        <Switch>
          <Route path='/' exact component={Header} />
          <Route path='/Signup' exact component={Header} />
          <Route path='/Home' exact component={HeaderHome} />
          <Route path='/Profile' exact component={HeaderHome} />
          <Route path='/PostDetails' exact component={HeaderHome} />
        </Switch>
      </>

      <main className='divLoginSignup'>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/Signup' exact component={Signup} />
          <Route path='/Home' exact component={Home} />
          <Route path='/Profile' component={Profile} />
          <Route path='/PostDetails' component={PostDetails} />
        </Switch>
      </main>

      <footer><p>© 2021, groupomania.com, Inc. ou ses filiales.</p></footer>
     
    </Router>
  );
}

export default App;
