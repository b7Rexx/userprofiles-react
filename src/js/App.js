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
import {setMyProfile, userList, userProfile} from "./actions";

const mapStateToProps = state => {
  return state;
};

function mapDispatchToProps(dispatch) {
  return {
    userList: () => (
      fetch('https://mock-io.herokuapp.com/users')
        .then(res => res.json())
        .then(data => dispatch(userList(data)))
    ),
    setMyProfile: () => (dispatch(setMyProfile('my-profile'))),
    userProfile: (data) => (dispatch(userProfile(data)))
  };
}

class ConnectedApp extends Component {
  componentDidMount() {
    this.props.userList();
  }

  render() {
    return (
      <div className='container'>
        <Router basename="/userprofiles-react">
          <div>
            <Switch>
              <Route path="/my-profile"
                     component={(routerProps) => <EnhancedMyProfile {...routerProps} {...this.props}
                                                                    myprofile={true}/>}/>
              <Route path="/profile/:id" component={(routerProps) => <EnhancedProfile {...routerProps} {...this.props}
                                                                                      myprofile={false}/>}/>
              <Route path='/' component={(routerProps) => <EnhancedHome {...routerProps} {...this.props}/>}/>
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
    if (props.myprofile) {
      props.setMyProfile();
    }else{
      if (!props.profile){
       props.userProfile({profileId:props.match.params.id})
      }
      console.log(props);
    }
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
              <li className={(props.location.pathname === '/') ? 'active' : ''}>
                <Link to='/'>People</Link>
              </li>
              <li className={(props.location.pathname === '/my-profile') ? 'active' : ''}>
                <Link to='/my-profile'>My
                  Profile</Link>
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
            <Link to='/'><i
              className='fa fa-arrow-circle-o-left'/></Link>
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
