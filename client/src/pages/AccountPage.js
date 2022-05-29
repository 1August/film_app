import {useHttp} from "../hooks/http.hook"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/AuthContext"

import temp from '../UI/img/MK-movie-left.jpg'

import '../UI/styles/accountPage.css'
import {Link, useParams} from "react-router-dom";
import {Loader} from "../components/Loader";

export const AccountPage = () => {
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'

    const {id} = useParams()

    const [user, setUser] = useState({})
    const [favMovies, setFavMovies] = useState([])

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
        if (error){
            setUser(null)
        }
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
                                :   error && user === null
                                    ?   'Error'
                                    :   user.username
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
                                : favMovies?.map((el, i) => {
                                    return(
                                        <div className="favoriteItem" key={el.title + i}>
                                            <div className="movieImg">
                                                <img src={getBackdropImgLink(el?.backdrop_path || el?.poster_path)} alt=""/>
                                            </div>
                                            <div className="movieDetails">
                                                <h2><Link to={`/movie/${el.id}}`}>{ el.title }</Link></h2>
                                                <p>
                                                    { `${el.overview.substring(0, 70)}...` }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>






                {/*<h1>{ user.email }</h1>*/}
                {/*{*/}
                {/*    loading*/}
                {/*    ?   <h3>Loading...</h3>*/}
                {/*    :   error*/}
                {/*        ? <h3>Something went wrong... Please, try again.</h3>*/}
                {/*        : user ?? user.favoriteMovies*/}
                {/*                ?   <h3>Let's add some movies to favorites!</h3>*/}
                {/*                :   <ul>*/}
                {/*                    { user.favoriteMovies.map(el => <li key={el.movieId}>Movie name</li>) }*/}
                {/*                </ul>*/}
                {/*}*/}
            </div>
        </section>
    )
}