import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Profile from "./components/profile";
import {connect} from "react-redux";
import {activeNav} from "./actions";

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    changeNavEvent: (nav) => dispatch(activeNav(nav))
  };
}

class ConnectedApp extends Component {
  render() {
    return (
      <div className='container'>
        <Router basename="/userprofiles-react">
          <div>
            <Switch>
              <Route path="/my-profile">
                <EnhancedMyProfile {...this.props}/>
              </Route>
              <Route path="/profile">
                <EnhancedProfile {...this.props}/>
              </Route>
              <Route path="/">
                <EnhancedHome {...this.props}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const EnhancedHome = withAuth(withHeader(Home));
const EnhancedProfile = withAuth(withBack(Profile));
const EnhancedMyProfile = withAuth(withHeader(Profile));

/**
 * Auth check
 * @param Component
 * @returns {Function}
 */
function withAuth(Component) {
  return function (props) {
    if (props.loggedStatus)
      return <Component {...props}/>;
    else
      return <Login/>;
  }
}

/**
 * with navigation header
 * @param Component
 * @returns {function(*): *}
 */
function withHeader(Component) {
  return function (props) {
    return (
      <div>
        <div className='header'>
          <nav className='navbar clearfix'>
            <ul>
              <li className={(props.activeNav === 'home') ? 'active' : ''}>
                <Link to='/' onClick={() => props.changeNavEvent('home')}>People</Link>
              </li>
              <li className={(props.activeNav === 'my-profile') ? 'active' : ''}>
                <Link to='/my-profile' onClick={() => props.changeNavEvent('my-profile')}>My Profile</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='content'>
          <Component {...props}/>
        </div>
      </div>
    );
  }
}

/**
 * with back button removing header
 * @param Component
 * @returns {function(*): *}
 */
function withBack(Component) {
  return function (props) {
    return (
      <div>
        <div className='header'>
          <div className='profile-nav'>
            <Link to='/' onClick={() => props.changeNavEvent('home')}><i className='fa fa-arrow-circle-o-left'/></Link>
            People
          </div>
        </div>
        <div className='content'>
          <Component {...props}/>
        </div>
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
