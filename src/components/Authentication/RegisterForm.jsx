import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/AuthAction/authAction';
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faKey, faEnvelopeSquare, faExclamationCircle, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Register() {

    const dispatch = useDispatch()

    const history = useHistory()

    const getDisplayName = useSelector((state) => state.auth.display_name)

    const [iconColor, setIconColor] = useState(false)

    const [objAuth, setObjAuth] = useState({
        display_name: '',
        user_email: '',
        user_password: '',
        user_password_confirm: ''
    });

    const [unlockSubmitBtn, setUnlockSubmitBtn] = useState(true)

    const handleChangeOfInputs = (e) => {
        setObjAuth({ ...objAuth, [e.target.name]: e.target.value})
    }

    const submitRegisterCredentials = () => {
        dispatch(registerUser(objAuth))
    }

    const toggleBtnStyle = () => setIconColor(!iconColor)

    useEffect(() => {
        if (objAuth.user_password === objAuth.user_password_confirm && objAuth.user_password !== '' && objAuth.user_email) {
            setUnlockSubmitBtn(false)
        }
        else {
            setUnlockSubmitBtn(true)
        }
    }, [objAuth])

    useEffect(() => {
        if (getDisplayName !== '' || getDisplayName === null) {
            history.push("/")
        }
    }, [history, getDisplayName, dispatch])

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); }}>

            <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faUser} /></i></span>
                    </div>
                    <input type="text"
                        className="form-control" name="display_name"  aria-describedby="helpId" onChange={handleChangeOfInputs} placeholder="Your Username" />
                </div>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faEnvelopeSquare} /></i></span>
                    </div>
                    <input type="email"
                        className="form-control" name="user_email"  aria-describedby="helpId" onChange={handleChangeOfInputs} placeholder="Your Email" />
                </div>

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
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
                    </div>
                    <input type={iconColor === true ? 'text' : 'password'}
                        className="form-control" name="user_password_confirm"  aria-describedby="helpId" onChange={handleChangeOfInputs} placeholder="Confirm Password" />
                </div>

                <div className="input-group">
                    <button className="btn btn-primary btn-block" disabled={unlockSubmitBtn} onClick={submitRegisterCredentials}> Register </button>
                </div>

            </form>            
        </div>
    )
}
