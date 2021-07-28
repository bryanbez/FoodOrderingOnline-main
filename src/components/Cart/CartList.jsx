import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCartInfo } from '../../redux/actions/CartAction/cartAction'
import CartCard from './CartCard'


export default function CartList() {

    const dispatch = useDispatch()

    const getProfileInfo = useSelector((state) => state.profile.profileInfo)

    const allFoodsInCart = useSelector((state) => state.cart.user_all_items_in_cart)

    // useEffect(() => {
    //     if (getProfileInfo.docId) {
    //       dispatch(fetchAllCartInfo(getProfileInfo.docId))
    //     }
        
    // }, [allFoodsInCart, dispatch, getProfileInfo.docId])

    const displayOfItems = allFoodsInCart.map(food => {
        return (
          <div key={food.docId}>
              <CartCard cartInfo={food}></CartCard>
          </div>
          
        )
        
    })

    return (
        <div>
            { displayOfItems }
        </div>
    )
}
