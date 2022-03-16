import {Link} from "react-router-dom";

import {useContext} from "react";
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

    return(
        <nav>
            <div className="nav__container container">
                <div className="nav__left">
                    <Link to={'/'}>
                        <img src={logo} alt="Film App Logo" id={'logo'}/>
                    </Link>
                </div>
                <div className="nav__links">
                    <ul>
                        <li><Link to={'/'}><span className="material-icons" id="homeIcon">&#xe88a;</span> Home</Link></li>
                        <li><Link to={'/films'}><span className="material-icons" id="filmsIcon">&#xe02c;</span> Films</Link></li>
                        <li><Link to={'/about'}><span className="material-icons" id="aboutIcon">&#xe8af;</span> About</Link></li>
                    </ul>
                </div>
                <div className="nav__account">
                    {
                        auth.isAuthenticated ?
                            (
                                <ul>
                                    <li><Link to={`/account/${auth.userId}`}>Account <span className={'material-icons'} id={'expandIcon'}>&#xe5c5;</span></Link></li>
                                    <li><Link to={'/'} onClick={logoutHandler}>Logout</Link></li>
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