import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCouriers, putCourierPrice } from '../../redux/actions/Courier/CourierAction'


export default function CourierDropdown() {

    const dispatch = useDispatch()
    const allCouriers = useSelector((state) => state.courier.listOfCouriers)

    useEffect(() => {
        if (allCouriers.length === 0) {
            dispatch(fetchCouriers())
        }
    }, [allCouriers, dispatch])

    const handleChangeOfCourier = (event) => {
        const { value } = event.target;
        dispatch(putCourierPrice(value))

    }

    const displayCourierList = allCouriers.map(courier => {
            return (
                <option key={courier.id} value={courier.courier_price} > { courier.courier_name } </option>
            )
    })

    return (
        <div className="form-group">
            <select className="form-select" onChange={handleChangeOfCourier} defaultValue="DEFAULT" aria-label="Default select example">
            <option value="DEFAULT" disabled> Select Courier...</option>
                { displayCourierList }
            </select>
        </div>
    )
}
