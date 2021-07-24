import React, { useEffect, useState, useRef } from 'react'
import { Modal } from 'bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrorMsg } from '../../redux/actions/MessageOrErrorAction/errorAction'

export default function ModalAlertErr() {

    const modalID = useRef()
    const dispatch = useDispatch()
    const errorMessage = useSelector((state) => state.error.errorMessageInfo)
    const [modalStatus, setModalStatus] = useState(null)

    useEffect(() => {
        setModalStatus(
            new Modal(modalID.current, {
                backdrop: 'static',
            })
        )
    }, [])

    useEffect(() => {
        if (errorMessage !== '') {
            return modalStatus.show()
        }
       
    })

    const showModal = () => {
        return (
            <div className="modal" tabIndex="-1" ref={modalID} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header bg-danger">
                        <h5 className="modal-title">ERROR</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() =>{
                            modalStatus.hide()
                            dispatch(clearErrorMsg())
                        }}></button>
                    </div>
                    <div className="modal-body">
                        <b> { errorMessage } </b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() =>{
                            modalStatus.hide()
                            dispatch(clearErrorMsg())
                        }}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            { showModal() }
        </div>
    )
}

