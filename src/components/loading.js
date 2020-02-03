import React from 'react';
import Rolling from './rolling.gif';

const Loading = () => {
    return (
        <div className="loading">
            <img src={Rolling}></img>
        </div>
    );
};

export default Loading;