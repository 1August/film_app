import {Link} from "react-router-dom"

import '../styles/variables.css'
import '../styles/index.css'
import '../styles/nav_footer.css'

import logo from '../img/film_app_logo.png'

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <ul>
                    <li><Link to={'/'}>
                        <img src={logo} alt="Film App Logo" id={'logo'}/>
                    </Link></li>
                    <li><Link to={'/'}>Link 2</Link></li>
                    <li><Link to={'/'}>Link 3</Link></li>
                    <li><Link to={'/'}>Link 4</Link></li>
                    <li><Link to={'/'}>Link 5</Link></li>
                    <li><Link to={'/'}>Link 6</Link></li>
                    <li><Link to={'/'}>Link 7</Link></li>
                    <li><Link to={'/'}>Link 8</Link></li>
                    <li><Link to={'/'}>Link 9</Link></li>
                    <li><Link to={'/'}>Link 10</Link></li>
                    <li><Link to={'/'}>Link 11</Link></li>
                    <li><Link to={'/'}>Link 12</Link></li>
                </ul>
            </div>
        </footer>
    )
}