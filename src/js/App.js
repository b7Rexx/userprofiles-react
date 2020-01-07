import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Link
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

  getRoutePath() {
    switch (this.props.activeNav) {
      case "home":
        return <EnhancedHome loggedStatus={this.props.loggedStatus}/>;
      default:
        return <EnhancedUser loggedStatus={this.props.loggedStatus}/>;
    }
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <nav className='navbar clearfix'>
              <ul>
                <li className={(this.props.activeNav === 'home') ? 'active' : ''}>
                  <Link to='/' onClick={() => this.props.changeNavEvent('home')}>Home</Link>
                </li>
                <li className={(this.props.activeNav === 'profile') ? 'active' : ''}>
                  <Link to='/profile' onClick={() => this.props.changeNavEvent('profile')}>My Profile</Link>
                </li>
              </ul>
            </nav>

            {this.getRoutePath()}
          </div>
        </Router>
      </div>
    );
  }
}

const EnhancedHome = withAuth(Home);
const EnhancedUser = withAuth(Profile);

/**
 * Auth check
 * @param Component
 * @returns {Function}
 */
function withAuth(Component) {
  return function (props) {
    if (props.loggedStatus)
      return <Component/>;
    else
      return <Login/>;
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
