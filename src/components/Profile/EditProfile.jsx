import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faUser, faAddressBook, faCalendarAlt, faPhoneAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { updateProfileInfo, clearMessageInfo } from '../../redux/actions/ProfileAction/profileAction';
import { singleError, clearErrorMsg } from '../../redux/actions/MessageOrErrorAction/errorAction';
import { validateEmail, alertMessageSuccess } from '../../helper';
import { Link } from 'react-router-dom';


export default function EditProfile(profileInfo = {}) {

    const errorMessage = useSelector((state) => state.error.errorMessageInfo)
    const infoMessage = useSelector((state) => state.messageInfo.message)

    const [profileInfoState, setProfileInfo] = useState({
        user_email: '',
        first_name: '',
        last_name: '',
        middle_initial: '',
        user_address: '',
        user_birthdate: '',
        user_mobile_number: '',
    })

    const getProfileInfo = profileInfo.location.state

    const dispatch = useDispatch()

    useEffect(() => {
        if (profileInfo.location.state) {
            setProfileInfo(getProfileInfo)
        }
    }, [profileInfo, getProfileInfo])

    useEffect(() => {
        console.log(infoMessage)
        if (infoMessage) {
            setTimeout(() => {
                dispatch(clearMessageInfo())
            }, 3000)
        }
    }, [infoMessage, dispatch])

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProfileInfo(prevState => ({
            ...prevState,
            [name]: value,
        }))
        if (e.target.name === 'user_email') {
            if (validateEmail(e.target.value) === false) {
                dispatch(singleError('Invalid Email Format'))
            } else {
                dispatch(clearErrorMsg())
            }   
            
        }
    }

    const showErrorMessage = () => {
        return (
            <div className="alert alert-danger" hidden={errorMessage ? false : true}>
                { errorMessage }
            </div>
        )
    }

    return (
        <div className="container">

            <div className="row mb-2 mt-2">
                <div className="col col-lg-10">
                    <h2 > Edit Profile </h2>
                </div>
                <div className="col col-lg-2 right">
                    <Link to="/profile" className="btn btn-danger" > Back </Link>
                </div>
            </div>
           
            { showErrorMessage() }
            { infoMessage ? alertMessageSuccess(infoMessage) : null }

            <form onSubmit={e => { e.preventDefault(); }}>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faEnvelopeSquare} /></i></span>
                    </div>
                    <input type="text"
                        className={errorMessage ? "form-control border-danger" : "form-control"} name="user_email" value={profileInfoState.user_email ? profileInfoState.user_email : ""} onChange={handleChangeInput} aria-describedby="helpId"  placeholder="Your Email" />
                    <div className="input-group-append">
                            <span className="input-group-text bg-danger text-white" hidden={errorMessage ? false : true} id=""><i><FontAwesomeIcon icon={faExclamationCircle} /></i></span>
                        </div>
                </div>
               <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id=""><i><FontAwesomeIcon icon={faUser} /></i></span>
                    </div>
                        <input type="text" name="first_name" className="form-control" value={profileInfoState.first_name ? profileInfoState.first_name : ""} onChange={handleChangeInput}  placeholder="First Name" />
                        <input type="text" name="last_name" className="form-control" value={profileInfoState.last_name ? profileInfoState.last_name : ""} onChange={handleChangeInput} placeholder="Last Name" />
                        <input type="text" name="middle_initial" className="form-control" value={profileInfoState.middle_initial ? profileInfoState.middle_initial : ""} onChange={handleChangeInput} placeholder="Middle Initial" />
                </div>
                 <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id=""><i><FontAwesomeIcon icon={faAddressBook} /></i></span>
                    </div>
                    <textarea className="form-control" name="user_address" value={profileInfoState.user_address ? profileInfoState.user_address : ""} onChange={handleChangeInput}  cols="20" rows="5" placeholder="Your Address"></textarea>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faCalendarAlt} /></i></span>
                    </div>
                    <input type="date"
                        className="form-control" name="user_birthdate" aria-describedby="helpId" value={profileInfoState.user_birthdate ? profileInfoState.user_birthdate : ""} onChange={handleChangeInput}  placeholder="Your Birthday" />
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faPhoneAlt} /></i></span>
                    </div>
                    <input type="text"
                        className="form-control" name="user_mobile_number" aria-describedby="helpId" value={profileInfoState.user_mobile_number ? profileInfoState.user_mobile_number : ""} onChange={handleChangeInput} placeholder="Your Mobile Number" />
                </div>

                <div className="input-group">
                    <button className="btn btn-primary btn-block" onClick={() => dispatch(updateProfileInfo(profileInfoState))}> Update </button>
                </div>

            </form>
        </div>
    )
}
