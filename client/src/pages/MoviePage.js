import {useParams} from "react-router-dom"
import {useContext, useEffect, useRef, useState as useRState} from "react"
import useState from "react-usestateref"

import '../UI/styles/moviePage.css'
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"

import '../UI/styles/moviePage.css'

import "swiper/css"
import "swiper/css/lazy"
import "swiper/css/pagination"

import '../UI/styles/mySwiper.css'
import {MySwiper} from "../components/MySwiper"

import tempLogo from '../UI/img/tempLogo.jpg'
import {Loader} from "../components/Loader";
import {Autoplay, Lazy} from "swiper";

export const MoviePage = () => {
    // auth
    const auth = useContext(AuthContext)

    // constants
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'
    const {id} = useParams()

    // useRef
    // const currMovieRef = useRef(null)
    const bgImage = useRef(null)

    // useHttp
    const {loading, error, request, clearError} = useHttp()

    // useStates
    const [currentMovie, setCurrentMovie, refCurrentMovie] = useState({})
    const [similarMovies, setSimilarMovies, refSimilarMovies] = useState([])
    const [isFavoriteMovie, setIsFavoriteMovie, refIsFavorite] = useState(false)

    // Functions
    const getBackdropImgLink = imgUrl => `https://image.tmdb.org/t/p/original${imgUrl}`
    const getMovieReqById = movieId => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`

    // Get current movie
    const getCurrentMovie = async () => {
        const dataMovie = await request(getMovieReqById(id))
        console.log('Movie', dataMovie)
        setCurrentMovie(dataMovie)
    }

    // Check is favorite
    const checkIsFavorite = async () => {
        const url = `/api/auth/isFavoriteMovie?userId=${auth.userId}&movieId=${refCurrentMovie.current.id}`
        const isFavoriteMovie = await request(url)
        setIsFavoriteMovie(isFavoriteMovie)
        return isFavoriteMovie
    }

    // Set bg image
    const setBgImage = () => {
        if (!bgImage.current) return
        bgImage.current.style.backgroundImage = `url(${getBackdropImgLink(refCurrentMovie.current?.backdrop_path || refCurrentMovie.current?.poster_path)})`
    }

    // Get similar movies
    const getSimilarMovies = async () => {
        const res = []
        const totalPages = 4
        for (let i = 1; i <= totalPages; i++) {
            const url = `https://api.themoviedb.org/3/movie/${refCurrentMovie.current.id}/similar?api_key=${API_KEY}&page=${i}`
            await fetch(url).then(res => res.json()).then(data => data?.results?.forEach(movie => res.push(movie)))
        }
        const uniqueMovies = [...new Map(res.map(movie => [movie.id, movie])).values()]
        setSimilarMovies(uniqueMovies)
    }

    /**
     * Add or remove favorite
     */
    const addOrRemoveFav = async e => {
        if (Object.values(refCurrentMovie.current).length === 0) return

        const removeFromFav = async () => {
            const url = `/api/auth/removeFromFavoriteMovies`
            const body = {
                userId: auth.userId,
                movieId: refCurrentMovie.current.id
            }
            const res = await request(url, 'POST', body)
            if (!res.ok) return
            setIsFavoriteMovie(false)
        }
        const addToFav = async () => {
            const url = `/api/auth/addToFavoriteMovies`
            const body = {
                userId: auth.userId,
                movieId: refCurrentMovie.current.id
            }
            const res = await request(url, 'POST', body)
            if (!res.ok) return
            setIsFavoriteMovie(true)
        }

        refIsFavorite.current ? await removeFromFav() : await addToFav()
        checkIsFavorite().then(() => setBgImage())
    }

    // useEffect
    useEffect(() => {
        /**
         * Get current movie
         */
        getCurrentMovie()
            /**
             * Check is favorite
             */
            .then(() => checkIsFavorite())
            /**
             * Set bg image
             */
            .then(() => setBgImage())
            /**
             * Get similar movies
             */
            .then(() => getSimilarMovies())
    }, [id])
    useEffect(() => {
        if (!refCurrentMovie.current) return
        setBgImage()
    }, [refIsFavorite.current])

    return (
        <section id={'moviePage'}>
            {
                loading ? <Loader/>
                    : Object.values(refCurrentMovie.current).length !== 0
                        ? <div className="movieHead" ref={bgImage}>
                            <div className="background">
                                <div className="container">
                                    <div className="movieHead__image">
                                        <img
                                            src={getBackdropImgLink(refCurrentMovie.current?.backdrop_path || refCurrentMovie.current?.poster_path)}
                                            alt="Backdrop image"
                                        />
                                    </div>
                                    <div className="movieHead__info">
                                        <h1>
                                            {refCurrentMovie.current?.title}
                                            <span className={'year'}>({refCurrentMovie.current?.release_date.substring(0, 4)})</span>
                                        </h1>
                                        <p><u>
                                            {refCurrentMovie.current?.tagline}
                                        </u></p>
                                        <p>
                                            {refCurrentMovie.current?.overview}
                                        </p>
                                        <p>
                                            User score - {refCurrentMovie.current?.vote_average}
                                        </p>
                                        <a href={refCurrentMovie.current?.homepage} target={'_blank'}>Homepage</a>
                                        <div className="favBtn">
                                            <button
                                                disabled={loading}
                                                className={'addToFav'}
                                                onClick={addOrRemoveFav}
                                                data-favorite={refIsFavorite.current}
                                            >
                                                <span>Add to favorites</span>
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
                            {refCurrentMovie.current?.release_date}
                        </p>
                    </div>
                    <div className="duration">
                        <h1>Duration</h1>
                        <p>
                            {refCurrentMovie.current?.runtime} min.
                        </p>
                    </div>
                    <div className="revenue">
                        <h1>Revenue</h1>
                        <p>
                            {refCurrentMovie.current?.revenue}
                        </p>
                    </div>
                    <div className="companies">
                        <h1>Production Companies</h1>
                        <div className="companiesList">
                            {
                                refCurrentMovie.current?.production_companies?.map(el => {
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
                                    : Object.entries(refSimilarMovies.current).length !== 0
                                        ? <MySwiper modules={[Lazy, Autoplay]} slidesPerView='5' getBackdropImgLink={getBackdropImgLink}>
                                            {Object.values(refSimilarMovies.current)}
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