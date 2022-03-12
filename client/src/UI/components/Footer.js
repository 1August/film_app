import '../styles/index.css'
import '../styles/nav_footer.css'
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <ul>
                    <li><Link to={'/'}>
                        <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c0840e59-db43-4681-ae7b-31a04dc4bc55/d7eqdvw-4e97ac92-e4b9-4498-9655-e4d612eb478b.png/v1/fill/w_1600,h_900,strp/random_logo_by_criticl_d7eqdvw-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYzA4NDBlNTktZGI0My00NjgxLWFlN2ItMzFhMDRkYzRiYzU1XC9kN2VxZHZ3LTRlOTdhYzkyLWU0YjktNDQ5OC05NjU1LWU0ZDYxMmViNDc4Yi5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X991O1jF5lTNZbbEoHEfoo6nlHEihBMHMIm5-uBCXcU" alt=""/>
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