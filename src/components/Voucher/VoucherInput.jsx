import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoucherCode } from '../../redux/actions/VoucherAction/voucherAction'

export default function VoucherInput() {

    const dispatch = useDispatch()

    const handleVoucherCode = (e) => {
        const { value } = e.target
        dispatch(fetchVoucherCode(value))
    }

    useEffect(() => {
        
        return () => {
            dispatch(fetchVoucherCode(''))
        }
    }, [dispatch])

    return (
        <div>
            <input type="text" name="voucher_code" className="form-control" onChange={handleVoucherCode} placeholder="Voucher Code (if any)" />
        </div>
    )
}
