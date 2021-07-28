import React from 'react'
import CartList from '../../components/Cart/CartList'

export default function Cart() {
    return (
        <div className="container">
            <div className="row mb-3 mt-3">
                <h1> Your Cart </h1>
            </div>
            <div className="row">
                <CartList/>
            </div>
        </div>
    )
}
