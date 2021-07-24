import React from 'react'

import { Link } from 'react-router-dom'
import FoodTable from '../../components/Food/FoodTable'

export default function Store() {


    return (
        <div className="container mb-5 mt-3">
            <div className="row">
                <div className="col col-lg-8">
                    <h1> Store Page</h1>                
                </div>
                <div className="col col-lg-4">
                    <Link to="/store/add">
                        <button className="btn btn-success"> Add Food </button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col col-lg-12">
                    <FoodTable></FoodTable>
                </div>
            </div>
        </div>
    )
}
