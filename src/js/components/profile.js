import React, {Component} from 'react';
import {connect} from "react-redux";
import Tag from "./tag";

const mapStateToProps = state => {
  return {color: state.color, bgColor: state.bgColor, profile: state.profile};
};

class ConnectedProfile extends Component {

  getAddress() {
    const addressRows = Object.keys(this.props.profile.address).map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <strong>
              {(item.split('').map(function (letter) {
                if (letter === letter.toUpperCase())
                  return ' ' + letter.toLowerCase();
                else
                  return letter;
              })).join('')}
            </strong>
          </td>
          <td>{this.props.profile.address[item]}</td>
        </tr>
      );
    });
    return (
      <div className='profile-address'>
        <table>
          <tbody>
          {addressRows}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div className='user-profile'>
        <div className='profile-image'
             style={{background: 'linear-gradient(to bottom,' + this.props.color + ',' + this.props.bgColor + ')'}}>
          <img src={this.props.profile.profileImage} alt="image"/>
        </div>
        <div className='profile-detail' style={{color: this.props.color, background: this.props.bgColor}}>
          <h1>{this.props.profile.firstName} {this.props.profile.lastName}</h1>
          <Tag faIcon='envelope' title={this.props.profile.email}/>
          <Tag faIcon='phone' title={this.props.profile.phone}/>
          {this.getAddress()}
        </div>
      </div>
    );
  }
}

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;
