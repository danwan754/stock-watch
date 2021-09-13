import React, { useEffect } from 'react';

import '../css/screens/HomeScreen.css';

// const backgroundStyle = {
//     backgroundImage: `linear-gradient(rgba(255,255,255,0.0), rgba(255,255,255,0.0)), url('/home-stock-market.jpg')`
// }

function HomeScreen(props) {

    return (
        <div className="home-screen-container">
            <div 
                className="home-banner"
                // style={ backgroundStyle }
            >
                S t o c k &nbsp; W a t c h
            </div>
        </div>
    );
}

export default HomeScreen;