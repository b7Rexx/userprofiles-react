import React, {Component} from 'react';

class Card extends Component {

  getColor() {
    return {color: this.props.color};
  }

  havingImage() {
    return (
      <div className='card-component clearfix' style={{background: this.props.background}}>
        <div className='card-img'>
          <img src={this.props.image} alt="image"/>
        </div>
        <div className='card-text' style={this.getColor()}>
          <strong>{this.props.title}</strong>
          <p>{this.props.detail}</p>
        </div>
      </div>
    );
  }

  noImage() {
    return (
      <div className='card-component clearfix' style={{background: this.props.background}}>
        <div className='card' style={this.getColor()}>
          <strong>{this.props.title}</strong>
          <p>{this.props.detail}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <li style={{width: this.props.width}} onClick={this.props.onClick}>
        {this.props.image ? this.havingImage() : this.noImage()}
      </li>
    );
  }
}

export default Card;