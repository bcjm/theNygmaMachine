import React from 'react';

function Preloader () {
    return(
      <div className="preloader wrapper">
        <img src={require('../assets/loading.png')} alt="loading"/>
      </div>
    )
}

export default Preloader;