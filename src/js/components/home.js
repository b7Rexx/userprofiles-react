import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userList, userProfile} from "../actions";
import Card from "./card";

const mapStateToProps = state => {
  return {users: state.users};
};

function mapDispatchToProps(dispatch) {
  return {
    userList: () => (
      fetch('https://mock-io.herokuapp.com/users')
        .then(res => res.json())
        .then(data => dispatch(userList(data)))
    ),
    getUserProfile: itemId => dispatch(userProfile(itemId))
  };
}

class ConnectedHome extends Component {
  componentDidMount() {
    this.props.userList();
  }

  render() {
    return (
      <div className='user-list'>
        <ul className='clearfix'>
          {this.props.users.map(item => (
            <Card
              key={item.id}
              id={item.id}
              width={300}
              background={(item.id % 5 === 0) ? 'green' : undefined}
              color={(item.id % 2 === 0) ? 'blue' : undefined}
              image={item.profileImage}
              title={item.firstName + item.lastName}
              detail={item.email}
              onClick={() => this.props.getUserProfile(item.id)}
            />))}
        </ul>
      </div>
    );
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
