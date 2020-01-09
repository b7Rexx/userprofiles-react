import React, {Component} from 'react';

class Loading extends Component {
  render() {
    return (
      <div className='loading'>
        <div className='loading-spinner'>
          <i className='fa fa-spinner'/>
        </div>
      </div>
    );
  }
}

export default Loading;