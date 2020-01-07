import React, {Component} from 'react';
import {connect} from "react-redux";
import Tag from "./tag";

const mapStateToProps = state => {
  return state.profile;
};

class ConnectedProfile extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  getAddress() {
    return this.props.address.street + ', ' + this.props.address.city + ', ' + this.props.address.country;
  }

  render() {
    return (
      <div className='user-profile'>
        <div className='profile-image'>
          <img src={this.props.profileImage} alt="image"/>
        </div>
        <div className='profile-detail'>
          <h1>{this.props.firstName} {this.props.lastName}</h1>
          <Tag faIcon='envelope' title={this.props.email}/>
          <Tag faIcon='phone' title={this.props.phone}/>
          <Tag faIcon='map' title={this.getAddress()}/>
        </div>
      </div>
    );
  }
}

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;
