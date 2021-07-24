import React from 'react'
import FoodInputs from './FoodInputs'


export default function EditFoodDetails(props) {

    const { query } = props.location;

    return (
        <div>
            <FoodInputs foodInfoToEdit={query}></FoodInputs>
        </div>
    )
}
