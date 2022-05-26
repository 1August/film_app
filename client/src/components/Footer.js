import {Link} from "react-router-dom"

import '../UI/styles/variables.css'
import '../UI/styles/welcomePage.css'
import '../UI/styles/nav_footer.css'

import logo from '../UI/img/SANDWITCH.png'

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <ul>
                    <li><Link to={'/'}>Link 1</Link></li>
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