import React from 'react';

const Square = (props) =>{
      return (
        <button id={props.index} className="square" disabled={true}>{props.index}</button>
      );
  }

  export default Square;