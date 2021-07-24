/* eslint-disable jsx-a11y/anchor-is-valid  */ 
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { refreshAuth, logOutUser } from '../redux/actions/AuthAction/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faListAlt, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    const dispatch = useDispatch()

    const getDisplayName = useSelector((state) => state.auth.display_name)

    useEffect(() => {
        setTimeout(() => {
            dispatch(refreshAuth())
        }, 2000)
    }, [dispatch, getDisplayName])

    const showLogInAndSignUp = () => {
        return (
            <>
                <NavLink to="/login">
                    <li className="nav-item">
                        <span className="nav-link"> Login </span>
                    </li>
                </NavLink >
                <NavLink to="/register">
                    <li className="nav-item">
                        <span className="nav-link"> Register </span>
                    </li>
                </NavLink >
            </>
        )
    }

    const showDisplayNameWhenLoggedIn = () => {
        return (
           
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    { getDisplayName }
                </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink to="/profile" className="dropdown-item"  > <li>Profile</li></NavLink>
                        <li><hr className="dropdown-divider" /></li>
                        <NavLink to="/login" className="dropdown-item" href="#" onClick={() => dispatch(logOutUser())}><li>Log Out </li></NavLink>
                    </ul>
                </li>
        )
    }

    const showAdminNavbar = () => {
        return (
            <>
                <NavLink to="/store" activeClassName="activeNavbar">
                    <li className="nav-item">
                        <span className="nav-link"> Store </span>
                    </li>
                </NavLink >
                <NavLink to="/about" activeClassName="activeNavbar">
                    <li className="nav-item">
                        <span className="nav-link"> About </span>
                    </li>
                </NavLink >
            </>
        )
    }

    const showCustomerNavbar = () => {
        return (
            <>
                <NavLink to="/store/list" activeClassName="activeNavbar">
                    <li className="nav-item">
                        <span className="nav-link"> <FontAwesomeIcon icon={faListAlt} /> Food List </span>
                    </li>
                </NavLink >
                <NavLink to="/favorites" activeClassName="activeNavbar">
                <li className="nav-item">
                        <span className="nav-link"> <FontAwesomeIcon icon={faHeart} /> Your Favorites </span>
                    </li>
                </NavLink>
                    <NavLink to="/cart" activeClassName="activeNavbar">
                    <li className="nav-item">
                        <span className="nav-link"> <FontAwesomeIcon icon={faCartPlus} /> Your Cart </span>
                    </li>
                </NavLink>
            </>
        )
    }

    const checkIfAdminCustomerOrGuest = () => {
        if (getDisplayName !== '') {
            if (getDisplayName === 'admin') {
                return showAdminNavbar()
            }
            return showCustomerNavbar()
        }
        else {
            return ''
        }
    }

    return (
        <div>
          
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container">
                    <NavLink to="/">
                        <span className="navbar-brand" href="#"> Food Ordering Store</span>
                    </NavLink >
                
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation"></button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-left mt-2 mt-lg-0">
                            { checkIfAdminCustomerOrGuest()  }      
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav mr-right mt-2 mt-lg-0">
                            { getDisplayName ? showDisplayNameWhenLoggedIn() : showLogInAndSignUp() }
                            {/* <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

            

        </div>
    )
}
