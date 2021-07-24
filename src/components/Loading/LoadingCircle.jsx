import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function LoadingCircle() {
    return (
        <div className="container loading-bar">
            <div className="d-flex justify-content-center mt-5">
                <h1>Loading  <FontAwesomeIcon icon={faSpinner} className="spinner"></FontAwesomeIcon></h1>
            </div>
        </div>
    )
}
