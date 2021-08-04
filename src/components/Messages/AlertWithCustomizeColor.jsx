import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearInfoMsg } from '../../redux/actions/MessageOrErrorAction/infoAction'

export default function AlertWithCustomizedColor() {
    
    const dispatch = useDispatch()

    const getInfoMessage = useSelector(state => state.messageInfo.message)
    const getColor = useSelector((state) => state.messageInfo.color)

    const [isShow, setIsShow] = useState('none') // block if show
    
    useEffect(() => {
        if (getInfoMessage) {
            setIsShow('block')
            setTimeout(() => {
                setIsShow('none')
                dispatch(clearInfoMsg())
            }, 3000);
        }
       
    }, [dispatch, getInfoMessage])

    return (
        <div className={`alert alert-${getColor}`} style={{ display: isShow }}>
            { getInfoMessage }
        </div>
    )
}
