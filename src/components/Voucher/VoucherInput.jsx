import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoucherCode, priceAfterVoucherApplied } from '../../redux/actions/VoucherAction/voucherAction'

export default function VoucherInput(params) {

    const dispatch = useDispatch()

    const voucherInfo = useSelector((state) => state.voucher.voucherInfo)

    const handleVoucherCode = (e) => {
        const { value } = e.target
        dispatch(fetchVoucherCode(value))
    }

    useEffect(() => {
        dispatch(priceAfterVoucherApplied(params.subTotal, voucherInfo))
        // return () => {
        //     //dispatch(priceAfterVoucherApplied(subTotal, []))
        //     dispatch(fetchVoucherCode(''))
        // }
    }, [dispatch, params.subTotal, voucherInfo])

    return (
        <div>
            <input type="text" name="voucher_code" className="form-control" onChange={handleVoucherCode} placeholder="Voucher Code (if any)" />
        </div>
    )
}
