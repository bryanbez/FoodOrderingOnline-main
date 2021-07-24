import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/AuthAction/authAction';
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faKey, faEnvelopeSquare, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import ModalAlertErr from '../Messages/ModalAlertErr';


export default function LoginForm() {

    const dispatch = useDispatch()
    const history = useHistory()

    const getDisplayName = useSelector((state) => state.auth.display_name)

    const [loginInfo, setLoginInfo] = useState({
        user_email: '',
        user_password: ''
    })

    const [unlockSubmitBtn, setUnlockSubmitBtn] = useState(true)

    const [emailFormatErr, setEmailFormatErr] = useState('')

    const [iconColor, setIconColor] = useState(false)

    useEffect(() => {
        if (getDisplayName !== '') {
            history.push("/")
        }

    }, [history, getDisplayName])

    useEffect(() => {

        if (loginInfo.user_email && loginInfo.user_password) {
            setUnlockSubmitBtn(false)
        }
        else {
            setUnlockSubmitBtn(true)
        }
    }, [loginInfo, setUnlockSubmitBtn])

    const handleChangeOfInputs = (e) =>  setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value})

    const toggleBtnStyle = () => setIconColor(!iconColor)

    const validateEmail = (email) => {
        const regexCode = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexCode.test(String(email).toLowerCase());
    }

    const submitLoginCredentials = () => {
        if (validateEmail(loginInfo.user_email) === true) {
            setEmailFormatErr('')
            dispatch(loginUser(loginInfo))

        }
        else {
            setEmailFormatErr("Please put a valid email address")
        }
    }

    return (

     
        <div className="container mt-3">
            <ModalAlertErr></ModalAlertErr>
            <h2> Login Your Account </h2>
            <form onSubmit={e => { e.preventDefault(); }}>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faEnvelopeSquare} /></i></span>
                    </div>
                    <input type="email"
                        className="form-control" name="user_email"  aria-describedby="helpId" onChange={handleChangeOfInputs} placeholder="Your Email" />
                    <div className="input-group-append" hidden={!emailFormatErr} >
                            <span className="input-group-text bg-danger text-white"> <i><FontAwesomeIcon icon={faExclamationCircle} /></i> </span>
                    </div>
                </div>
                {/* <span className="alert alert-danger mb-2 mt-2 form-control" > { emailFormatErr }</span> */}


                <div className="input-group">
                <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
                    </div>
                    <input type={iconColor === true ? 'text' : 'password'}
                        className="form-control" name="user_password" aria-describedby="helpId" onChange={handleChangeOfInputs} placeholder="Your Password" />
                        <div className="input-group-append">
                            <span className={`input-group-text cursor-pointer ${iconColor === true ? 'bg-primary text-white' : ''}`} onClick={() => toggleBtnStyle()}> <i><FontAwesomeIcon icon={faEye} /></i> </span>
                        </div>
                </div>

                <div className="input-group">
                    <button className="btn btn-primary btn-block" disabled={unlockSubmitBtn} onClick={submitLoginCredentials}> Login </button>
                </div>

            </form>      
        </div>
    )
}
