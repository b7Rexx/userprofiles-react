import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userList, userProfile} from "../actions";
import Card from "./card";
import {Link} from "react-router-dom";

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
    getUserProfile: (profileId, color, bgColor) => {
      dispatch(userProfile({profileId: profileId, color: color, bgColor: bgColor}))
    }
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
              background={(item.id % 4 === 0) ? '#F2AA4C' : undefined}
              color={(item.id % 4 === 0) ? '#101820' : undefined}
              image={item.profileImage}
              title={item.firstName + item.lastName}
              detail={item.phone}
              subDetail={item.email}
              onClick={this.props.getUserProfile}
            />))}
        </ul>
      </div>
    );
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
