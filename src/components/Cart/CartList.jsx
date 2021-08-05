import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartCard from './CartCard'
import VoucherInput from '../Voucher/VoucherInput'
import AlertWithCustomizedColor from '../Messages/AlertWithCustomizeColor'
import CourierDropdown from '../Courier/CourierDropdown'
import { passTotalPriceToPay } from '../../redux/actions/CartAction/cartAction'

export default function CartList() {

    const dispatch = useDispatch()

    const allFoodsInCart = useSelector((state) => state.cart.user_all_items_in_cart)

    const subTotal = useSelector((state) => state.cart.sub_total)

    const discount = useSelector((state) => state.voucher.discountPrice)

    const courierPrice = useSelector((state) => state.courier.selectedCourierPrice)

    const afterVoucherAppliedPrice = useSelector((state) => state.voucher.priceAfterVoucherApplied)

    const totalPrice = useSelector((state) => state.cart.total_price_to_pay)
    
    useEffect(() => {
        if (courierPrice) {
            if (afterVoucherAppliedPrice) {
                dispatch(passTotalPriceToPay(parseFloat(afterVoucherAppliedPrice), parseInt(courierPrice)))
            }
            dispatch(passTotalPriceToPay(parseFloat(subTotal), parseInt(courierPrice)))
        }
        if (subTotal) {
            dispatch(passTotalPriceToPay(parseFloat(subTotal), parseInt(courierPrice)))
        }
        if (afterVoucherAppliedPrice) {
            dispatch(passTotalPriceToPay(parseFloat(afterVoucherAppliedPrice), parseInt(courierPrice)))
        }
    }, [afterVoucherAppliedPrice, courierPrice, subTotal, dispatch])


    const displayOfItems = allFoodsInCart.map(food => {
        return (
          <div key={food.docId}>
              <CartCard cartInfo={food}></CartCard>
          </div>
          
        )
    })

    return (
        <div className="container mb-4">
            { displayOfItems }
            <div className="row">
                <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col col-sm-6 col-lg-10">
                               <h3> SubTotal: </h3>
                            </div>
                            <div className="col col-sm-6 col-lg-2">
                               <h3> &#8369; {subTotal} </h3>
                            </div>
                        </div>
                         
                    </li>
                    <li className="list-group-item">
                    <div className="row">
                            <div className="col col-sm-4 col-lg-3">
                               <h4> Voucher Code: </h4>
                            </div>
                            <div className="col col-sm-4 col-lg-7">
                                <VoucherInput subTotal={subTotal}></VoucherInput>
                                <br />
                                <AlertWithCustomizedColor></AlertWithCustomizedColor>
                            </div>
                            <div className="col col-sm-4 col-lg-2">
                               { discount === 0 ? '' : (<h4> - { discount } </h4>)}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                    <div className="row">
                            <div className="col col-sm-6 col-lg-3">
                               <h4> Shipping Fee: </h4>
                            </div>
                            <div className="col col-sm-6 col-lg-7">
                                <CourierDropdown></CourierDropdown>
                            </div>
                            <div className="col col-sm-6 col-lg-2">
                                { courierPrice === 0 ? '' : (<h4> + &#8369; { courierPrice } </h4>)}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                    <div className="row">
                            <div className="col col-sm-6 col-lg-9">
                               <h3> Total Price: </h3>
                            </div>
                            <div className="col col-sm-6 col-lg-3">
                               <h1> &#8369; {totalPrice} </h1>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}
