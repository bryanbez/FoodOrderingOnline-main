import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearInfoMsg } from '../../redux/actions/MessageOrErrorAction/infoAction'

export default function AlertInfo() {
    
    const dispatch = useDispatch()

    const getInfoMessage = useSelector(state => state.messageInfo.message)

    const [isShow, setIsShow] = useState('none') // block if show
    
    useEffect(() => {
        if (getInfoMessage !== '') {
            setIsShow('block')
            setTimeout(() => {
                setIsShow('none')
                dispatch(clearInfoMsg())
            }, 3000);
        }
        // return function cleanup() {
        //     dispatch(clearInfoMsg())
        // }
       
    }, [dispatch, getInfoMessage])

    return (
        <div className="alert alert-info" style={{ display: isShow }}>
            { getInfoMessage }
        </div>
    )
}
