import {useHttp} from "../hooks/http.hook"
import {useContext, useEffect} from "react"
import useState from "react-usestateref"
import {AuthContext} from "../context/AuthContext"

import temp from '../UI/img/MK-movie-left.jpg'

import '../UI/styles/accountPage.css'
import {Link, useParams} from "react-router-dom";
import {Loader} from "../components/Loader";

export const AccountPage = () => {
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'

    const {id} = useParams()

    const [user, setUser, refUser] = useState({})
    const [favMovies, setFavMovies, refFavMovies] = useState([])

    const auth = useContext(AuthContext)

    const {loading, request, error} = useHttp()

    /**
     * Returns image URL of background
     * @param imgUrl
     * @returns {`https://image.tmdb.org/t/p/original${string}`}
     */
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`

    /**
     * Get user info
     */
    useEffect(async () => {
        const url = '/api/auth/getUserById'
        const data = await request(url, 'POST', {userId: auth.userId})
        setUser(data)
    }, [])

    /**
     * Get fav movies
     */
    useEffect(() => {
        const favMovies = []
        const getFavMovies = async () => {
            let url = `/api/auth/getFavorites?userId=${auth.userId}`
            const favMoviesRes = await request(url)
            for (const movie of favMoviesRes) {
                const url = `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${API_KEY}&language=en-US`
                const movieData = await request(url)
                favMovies.push(movieData)
            }
            setFavMovies(favMovies)
        }
        getFavMovies()
    }, [auth.userId])

    return(
        <section id="account">
            <div className="container">
                <div className="account">
                    <div className="accountImg">
                        <img src={temp} alt=""/>
                    </div>
                    <div className="accountInfo">
                        <h1>
                            {
                                loading
                                ?   <Loader/>
                                :   error && refUser.current === null
                                    ?   'Error'
                                    :   refUser.current.username
                            }
                        </h1>
                        <h3>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, repellendus?
                        </h3>
                    </div>
                </div>
                <div className="details">
                    <h2>Favorite movies</h2>
                    <hr/>
                    <div className="favoriteList">
                        {
                            loading
                            ? <Loader/>
                            : error ? <h1>{ error.message || 'Error' }</h1>
                                : refFavMovies.current.length !== 0
                                        ? refFavMovies.current?.map((movie, i) => {
                                            return(
                                                <div className="favoriteItem" key={movie?.title + i}>
                                                    <div className="movieImg">
                                                        <img src={getBackdropImgLink(movie?.backdrop_path || movie?.poster_path)} alt=""/>
                                                    </div>
                                                    <div className="movieDetails">
                                                        <h2><Link to={`/movie/${movie.id}}`}>{ movie?.title }</Link></h2>
                                                        <p>
                                                            { `${movie?.overview.substring(0, 70)}...` }
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <h1>Your favourite list is empty!</h1>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}