import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCartInfo, updateQtyOfFoodItem } from '../../redux/actions/CartAction/cartAction'

export default function QuantityTextBox(params) {

    const { quantity, initialPrice, docId } = params.data

    const dispatch = useDispatch()

    const getProfileInfo = useSelector((state) => state.profile.profileInfo)

    const [quantityCount, setQuantityCount] = useState(quantity)

    const handleQtyChange = (event) => {
            setQuantityCount(event.target.value)
            if (event.target.value !== ''){
               
                    dispatch(updateQtyOfFoodItem({
                        'docId': docId,
                        'quantity': event.target.value,
                        'initialPrice': initialPrice
                    }))
                setTimeout(() => {
                   dispatch(fetchAllCartInfo(getProfileInfo.docId))
                }, 1000)
            }
         
              
    }

    // const handleQtyChange = (event) => {
    //    setQuantityCount(event.target.value)
    // }

    // useEffect(() => {
    //     setTimeout(() => {
    //         handleChangeOfQuantity()
    //     }, 2000)
       
    // })

    return (
        // <div className="input-group">
        //     <div className="input-group-prepend">
        //         <span className="input-group-text">Quantity</span>
        //     </div>
        //     <div className="input-group-prepend">
        //         <button className="btn btn-primary input-group-text" onClick={() => setQuantityCount(quantityCount - 1)}> - </button>
        //     </div>
        //     <input type="text"
        //         className="form-control" name="quantity" value={quantityCount} readOnly aria-describedby="helpId" placeholder="Quantity Count" />
        //     <div className="input-group-append">
        //     <button className="btn btn-primary input-group-text" onClick={() => setQuantityCount(quantityCount + 1)}> + </button>
        //     </div>
        // </div>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Quantity</span>
            </div>
            <input type="text"
                className="form-control" name="quantity" value={quantityCount} onChange={handleQtyChange} aria-describedby="helpId" placeholder="Quantity Count" />
        </div>
    )
}
