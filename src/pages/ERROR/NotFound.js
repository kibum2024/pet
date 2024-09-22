import React from 'react';
import NotFoundImage from "./images/NotfoundImage.jpg"
import "./NotFound.scss"

function NotFound() {
    return(
        <div className="NotFound_not-found" >
            <img className="NotFound_NotFoundImage" src={NotFoundImage} alt="Notfound image" />
        </div>
    )
}

export default NotFound;