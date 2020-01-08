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
            <EnhancedCard key={item.id} {...this.props} item={item}/>
          ))}
        </ul>
      </div>
    );
  }
}

const EnhancedCard = withRouter(Card);

function withRouter(Card) {
  return function (props) {
    return (
      <Link to={'/profile?id=' + props.item.id}>
        <Card
          key={props.item.id}
          id={props.item.id}
          width={300}
          background={(props.item.id % 4 === 0) ? '#F2AA4C' : undefined}
          color={(props.item.id % 4 === 0) ? '#101820' : undefined}
          image={props.item.profileImage}
          title={props.item.firstName + props.item.lastName}
          detail={props.item.phone}
          subDetail={props.item.email}
          onClick={props.getUserProfile}
        />
      </Link>
    );
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;
