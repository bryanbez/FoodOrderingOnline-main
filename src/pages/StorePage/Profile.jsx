import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { faUser, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'
import { fetchUserInfo } from '../../redux/actions/ProfileAction/profileAction'

export default function Profile() {

    const dispatch = useDispatch()

    const getLoggedInDisplayName = useSelector(state => state.auth.display_name)

    const getProfileInfo = useSelector((state) => state.profile.profileInfo)

    useEffect(() => {
        if (getLoggedInDisplayName) {
            dispatch(fetchUserInfo(getLoggedInDisplayName))
        }
    }, [dispatch, getLoggedInDisplayName])


    return (
        <div className="container mt-3">

            <h2 className="mb-3 mt-2"> Your Profile </h2>

            <div className="card border-secondary mb-3" >
            <div className="row g-0">
                <div className="col-md-4">
                <img src="https://firebasestorage.googleapis.com/v0/b/storeapp-eee5c.appspot.com/o/food_images%2F8dm34n?alt=media&token=b7258010-9e1f-4f57-9c56-c04075ac6588" className="img-thumbnail rounded-start" width="250" height="250"  alt="..." />
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h2 className="card-title"> <FontAwesomeIcon icon={faUser} /> { getProfileInfo.display_name } </h2>
                    <p className="card-text"><small className="text-muted"> <FontAwesomeIcon icon={faEnvelopeSquare} /> { getProfileInfo.user_email } </small></p>
                    <hr />
                    <div className="card border-secondary">
                        <div className="card-header">
                            Statistics
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"> Total Checkouts: 0  </li>
                            <li className="list-group-item"> Vouchers Used: 0 </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="card border-secondary">
                        <div className="card-header">
                            Options
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">  <Link to={{ pathname: `/profile/${getProfileInfo.docId}/edit`, state: getProfileInfo}} className="btn btn-primary"> Edit Profile </Link> </li>
                           
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}
