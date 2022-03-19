import {Link} from "react-router-dom";

import {useContext, useRef} from "react";
import {AuthContext} from "../../context/AuthContext"

import '../styles/variables.css'
import '../styles/index.css'
import '../styles/nav_footer.css'

import logo from '../img/film_app_logo.png'

export const Nav = () => {

    const auth = useContext(AuthContext)

    const logoutHandler = () => {
        auth.logout()
    }

    // const navLinks = useRef({});

    // const makeActive = el => {
    //     console.log(navLinks)
    //     el.classList.add('active')
    // }

    const expandAccountNav = useRef({})

    const expandAccount = () => {
        expandAccountNav.current.classList.toggle('show')
    }

    return (
        <nav>
            <div className="nav__container container">
                <div className="nav__left">
                    <Link to={'/'}>
                        <img src={logo} alt="Film App Logo" id={'logo'}/>
                    </Link>
                </div>
                <div className="nav__links">
                    <ul>
                        <li><Link to={'/'}><span className="material-icons" id="homeIcon">&#xe88a;</span>Home</Link></li>
                        <li><Link to={'/films'}><span className="material-icons" id="filmsIcon">&#xe02c;</span>Films</Link>
                        </li>
                        <li><Link to={'/about'}><span className="material-icons" id="aboutIcon">&#xe8af;</span>About</Link>
                        </li>
                    </ul>
                </div>
                <div className="nav__account">
                    {
                        auth.isAuthenticated ?
                            (
                                <ul>
                                    <li>
                                        <p onClick={expandAccount}>{/*Account*/} <span className={'material-icons'} id={'expandIcon'}>&#xe853;</span></p>

                                        <div className="expandAccount" ref={expandAccountNav}>
                                            <ul>
                                                <li><Link to={`/account/${auth.userId}`}>Account</Link></li>
                                                <li><Link to={'/'} onClick={logoutHandler}>Logout</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            ) :
                            (
                                <ul>
                                    <li><Link to={'/register'}>Register</Link></li>
                                </ul>
                            )
                    }
                    {/*<AuthCheck/>*/}
                </div>
            </div>
        </nav>
    )
}