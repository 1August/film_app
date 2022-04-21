import {Link} from "react-router-dom"

import {useContext, useEffect, useRef, useState} from "react"
import {AuthContext} from "../../context/AuthContext"


import '../styles/variables.css'
import '../styles/welcomePage.css'
import '../styles/nav_footer.css'

import logo from '../img/film_app_logo.png'
import {useHttp} from "../../hooks/http.hook"

export const Nav = () => {
    const auth = useContext(AuthContext)
    const expandAccountNav = useRef({})

    const [userEmail, setUserEmail] = useState(null)

    const logoutHandler = () => {
        auth.logout()
    }

    const expandAccount = () => {
        expandAccountNav.current.classList.toggle('show')
    }

    const hideExpandMenu = () => {
        expandAccountNav.current.classList.toggle('show')
    }


    const {loading, error, request} = useHttp()

    useEffect(async () => {
        try {
            if (auth?.userId){
                const url = '/api/auth/getEmailById'
                setUserEmail(await request(url, 'POST', { userId: auth.userId }))
            }
        } catch (e) {
            console.error(e)
        }
    }, [])


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
                        <li><Link to={'/films'}><span className="material-icons" id="filmsIcon">&#xe02c;</span>Films</Link></li>
                        <li><Link to={'/about'}><span className="material-icons" id="aboutIcon">&#xe8af;</span>About</Link></li>
                        {
                            auth.isAuthenticated ?
                                <li>
                                    <p onClick={expandAccount}><span className={'material-icons'} id={'expandIcon'}>&#xe853;</span>{ userEmail }</p>
                                    <div className="expandAccount" ref={expandAccountNav}>
                                        <ul onClick={hideExpandMenu}>
                                            <li><Link to={`/account/${auth.userId}`}>Account</Link></li>
                                            <li><Link to={'/'} onClick={logoutHandler}>Logout</Link></li>
                                        </ul>
                                    </div>
                                </li> :
                                <li><Link to={'/auth'}><span className={'material-icons'} id={'expandIcon'}>&#xe853;</span>Account</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}