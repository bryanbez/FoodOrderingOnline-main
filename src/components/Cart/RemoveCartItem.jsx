import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemInCart } from '../../redux/actions/CartAction/cartAction'


export default function RemoveCartItem(params) {
 
    const dispatch = useDispatch()

    const getProfileInfo = useSelector((state) => state.profile.profileInfo)

    const removeItem = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure to remove this food? ")) {
            dispatch(removeItemInCart(params.itemId, getProfileInfo.docId))
        }
    }

    return (
        <div>
            <button className="btn btn-danger" onClick={removeItem}> Remove </button>
        </div>
    )
}
