import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVoucherCode, priceAfterVoucherApplied } from '../../redux/actions/VoucherAction/voucherAction'

export default function VoucherInput(params) {

    const dispatch = useDispatch()

    const voucherInfo = useSelector((state) => state.voucher.voucherInfo)
    const [voucherCode, setVoucherCode] = useState('')

    const handleVoucherCode = (e) => {
        const { value } = e.target
        setVoucherCode(value)
        dispatch(fetchVoucherCode(value, params.subTotal))
    }

    useEffect(() => {
        if (voucherCode !== ''){
            dispatch(priceAfterVoucherApplied(params.subTotal, voucherInfo))
        }
    }, [dispatch, params.subTotal, voucherInfo, voucherCode])

    return (
        <div>
            <input type="text" name="voucher_code" className="form-control" onChange={handleVoucherCode} placeholder="Voucher Code (if any)" />
        </div>
    )
}
