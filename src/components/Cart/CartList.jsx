import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCartInfo } from '../../redux/actions/CartAction/cartAction'
import CartCard from './CartCard'
import VoucherInput from '../Voucher/VoucherInput'
import { priceAfterVoucherApplied } from '../../redux/actions/VoucherAction/voucherAction'
import AlertWithCustomizedColor from '../Messages/AlertWithCustomizeColor'

export default function CartList() {

    const dispatch = useDispatch()

    const getProfileInfo = useSelector((state) => state.profile.profileInfo)

    const allFoodsInCart = useSelector((state) => state.cart.user_all_items_in_cart)

    const subTotal = useSelector((state) => state.cart.sub_total)

    const voucherInfo = useSelector((state) => state.voucher.voucherInfo)

    const discount = useSelector((state) => state.voucher.discountPrice)

    const afterVoucherAppliedPrice = useSelector((state) => state.voucher.priceAfterVoucherApplied)
    
    useEffect(() => {
          dispatch(priceAfterVoucherApplied(subTotal, voucherInfo))
          return function cleanup(){
                dispatch(priceAfterVoucherApplied(subTotal, []))
          }
    }, [voucherInfo, subTotal, dispatch])

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
                                <VoucherInput></VoucherInput>
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
                            <div className="col col-sm-6 col-lg-10">
                               <h4> Shipping Fee: </h4>
                            </div>
                            <div className="col col-sm-6 col-lg-2">
                                {/* shipping fee */} <h3> &#8369; 80 </h3>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                    <div className="row">
                            <div className="col col-sm-6 col-lg-9">
                               <h3> Total Price: </h3>
                            </div>
                            <div className="col col-sm-6 col-lg-3">
                               <h1> &#8369; {afterVoucherAppliedPrice} </h1>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}
