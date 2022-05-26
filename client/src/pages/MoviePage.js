import {useParams} from "react-router-dom"
import {useContext, useEffect, useRef, useState} from "react"

import '../UI/styles/moviePage.css'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"

import '../UI/styles/moviePage.css'
import {MovieCategorySlider} from "../components/MovieCategorySlider";

import "swiper/css"
import "swiper/css/lazy"
import "swiper/css/pagination"

import '../UI/styles/mySwiper.css'
import {MySwiper} from "../components/MySwiper"

import tempLogo from '../UI/img/tempLogo.jpg'
import {Loader} from "../components/Loader";

export const MoviePage = () => {
    // auth
    const auth = useContext(AuthContext)

    // constants
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'
    const {id} = useParams()

    // useRef
    const currMovieRef = useRef(null)
    const bgImage = useRef(null)

    // useHttp
    const {loading, error, request, clearError} = useHttp()

    // useStates
    const [currentMovie, setCurrentMovie] = useState({})
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavoriteMovie, setIsFavoriteMovie] = useState(false)

    // const [user, setUser] = useState({})

    // Functions
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`
    const getMovieReqById = movieId => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`

    // useEffect
    /**
     * Get current movie
     */
    useEffect(async () => {
        const dataMovie = await request(getMovieReqById(id))
        console.log('Movie', dataMovie)
        setCurrentMovie(dataMovie)
    }, [id])

    /**
     * Get similar movies and set bg image
     */
    useEffect(async () => {
        if (currentMovie?.id) {
            const res = []
            const totalPages = 4
            for (let i = 1; i <= totalPages; i++) {
                const url = `https://api.themoviedb.org/3/movie/${currentMovie.id}/similar?api_key=${API_KEY}&page=${i}`
                await fetch(url).then(res => res.json()).then(data => data?.results?.forEach(movie => res.push(movie)))
            }
            const uniqueMovies = [...new Map(res.map(movie => [movie.id, movie])).values()]
            setSimilarMovies(uniqueMovies)

            /**
             * Set bg image
             */
            bgImage.current.style.backgroundImage = `url(${getBackdropImgLink(currentMovie?.backdrop_path || currentMovie?.poster_path)})`
        }
    }, [currentMovie?.id])

    /**
     * Add to favorite list
     */
    const addToFav = async e => {
        if (Object.values(currentMovie).length !== 0){
            e.target.disabled = true

            const url = `/api/auth/addToFavoriteMovies`
            const body = {
                userId: auth.userId,
                movieId: currentMovie.id
            }
            const data = await request(url, 'POST', body)

            console.log('f', e.target.getAttribute('data-favorite'))
            e.target.setAttribute('data-favorite', `${!+e.target.getAttribute('data-favorite')}`)
            console.log('s', e.target.getAttribute('data-favorite'))
            // debugger
            e.target.disabled = false
        }
    }

    /**
     * Check is favorite
     */
    useEffect(() => {
        const isFavorite = async () => {
            console.log('lvl 1')
            if (currentMovie){
                console.log('entered')
                console.log('USER AND MOVIE', auth.userId, currentMovie.movieId)
                const url = `/api/auth/isFavoriteMovie?userId=${auth.userId}&movieId=${currentMovie.movieId}`
                const isFavoriteMovie = await request(url)
                console.log(isFavoriteMovie)
                setIsFavoriteMovie(isFavoriteMovie)
            }
            isFavorite()
        }
    }, [currentMovie])

    return (
        <section id={'moviePage'}>
            {
                loading ? <Loader/>
                    : Object.values(currentMovie).length !== 0
                        ? <div className="movieHead" ref={bgImage}>
                            <div className="background">
                                <div className="container">
                                    <div className="movieHead__image">
                                        <img
                                            src={getBackdropImgLink(currentMovie?.backdrop_path || currentMovie?.poster_path)}
                                            alt="Backdrop image"
                                        />
                                    </div>
                                    <div className="movieHead__info">
                                        <h1>
                                            {currentMovie?.title}
                                            <span className={'year'}>({currentMovie?.release_date.substring(0, 4)})</span>
                                        </h1>
                                        <p><u>
                                            {currentMovie?.tagline}
                                        </u></p>
                                        <p>
                                            {currentMovie?.overview}
                                        </p>
                                        <p>
                                            User score - {currentMovie?.vote_average}
                                        </p>
                                        <a href={currentMovie?.homepage} target={'_blank'}>Homepage</a>
                                        <div className="favBtn">
                                            <button
                                                className={'addToFav'}
                                                onClick={addToFav}
                                                data-favorite={isFavoriteMovie ? 1 : 0}
                                            >
                                                Add to favorites
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : error ? error.message || <h1>Error</h1> : <h1>Empty</h1>
            }
            <div className="movieBody">
                <div className="container">
                    <div className="releaseDate">
                        <h1>Release Date</h1>
                        <p>
                            {currentMovie?.release_date}
                        </p>
                    </div>
                    <div className="duration">
                        <h1>Duration</h1>
                        <p>
                            {currentMovie?.runtime} min.
                        </p>
                    </div>
                    <div className="revenue">
                        <h1>Revenue</h1>
                        <p>
                            {currentMovie?.revenue}
                        </p>
                    </div>
                    <div className="companies">
                        <h1>Production Companies</h1>
                        <div className="companiesList">
                            {
                                currentMovie?.production_companies?.map(el => {
                                    return (
                                        <div className={'companyItem'} key={el?.id}>
                                            <img className={'logo'} src={ el?.logo_path ? getBackdropImgLink(el?.logo_path) : tempLogo} alt="Logo"/>
                                            <p>{el.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="similarMovies">
                        <h1>Similar Movies</h1>
                        <div className="similarMoviesList">
                            {
                                loading
                                    ? <Loader/>
                                    : Object.entries(similarMovies).length !== 0
                                        ? <MySwiper getBackdropImgLink={getBackdropImgLink}>
                                            {Object.values(similarMovies)}
                                        </MySwiper>
                                        : error ? error.message || <h1>Error</h1> : <h1>Empty</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}