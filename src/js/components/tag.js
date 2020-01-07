import React from 'react';


function Tag(props) {
  return (
    <div className='tag'>
      <i className={'fa fa-' + (props.faIcon)}/>
      <span>{props.title}</span>
    </div>
  );
}

export default Tag;