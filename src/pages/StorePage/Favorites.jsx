import React from 'react'
import FavoriteFoodList from '../../components/Favorites/FavoriteFoodList'

export default function Favorites() {

    return (
        <div className="container">

            <h1 className="mt-3 mb-3"> Your Favorite Foods </h1>
            <FavoriteFoodList />
        </div>
    )
}
