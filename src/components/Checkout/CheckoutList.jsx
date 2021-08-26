import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCheckoutList } from '../../redux/actions/CheckoutAction/checkoutAction'
import FoodCardInCheckout from './FoodCardInCheckout'


export default function CheckoutList() {

    const getAllCheckoutInfo = useSelector((state) => state.checkout.checkoutList)

    const dispatch = useDispatch()

    useEffect(() => {
        if (getAllCheckoutInfo.length === 0) {
            dispatch(fetchCheckoutList())
        }
        
    }, [dispatch, getAllCheckoutInfo])

    console.log(getAllCheckoutInfo.checkoutItems)

    // const mainDisplay = () => {
    //     if (getAllCheckoutInfo.length !== 0) {
    //         return (
    //             <div className="card">
    //                 <div className="card-title">
                        
    //                 </div>
    //                 <div className="card-body">
    //                     <div className="card"> 
    //                         <ul className="list-group list-group-flush">
    //                             {
    //                                 getAllCheckoutInfo.checkoutItems.value.map(items => <FoodCardInCheckout foodInfo={items}></FoodCardInCheckout> )
    //                             }
    //                         </ul>
    //                     </div>
    //                 </div>
    //                 <div className="card-footer">
    //                    <h4> Total Price: { getAllCheckoutInfo.checkoutItems.totalPrice } pesos</h4> 
    //                 </div>
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <h3> No Pending Orders </h3>
    //         )
    //     }
    // }



    return (
        
        <div className="container">
            <h2> Checkouts </h2>
           {/* { mainDisplay() } */}
        </div>
    )
}
