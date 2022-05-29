import '../UI/styles/aboutPage.css'
import {useEffect, useMemo} from "react"
import useState from "react-usestateref"
import {useHttp} from "../hooks/http.hook";
import {MovieCard} from "../components/MovieCard";
import {Loader} from "../components/Loader";

import imgPlaceholder from '../UI/img/imagePlaceholder.jpg'

export const SearchPage = () => {
    // constants
    const API_KEY = 'da0213edba5ce29d325c43cfec6aeab5'

    const [searchQuery, setSearchQuery, refSearchQuery] = useState('')
    const [searchMovies, setSearchMovies, refSearchMovies] = useState([])
    const [trendingMovies, setTrendingMovies, refTrendingMovies] = useState([])

    const {loading, error, request, clearError} = useHttp()

    // Functions
    /**
     * Returns image URL of background
     * @param imgUrl
     * @returns {`https://image.tmdb.org/t/p/original${string}`}
     */
    const getBackdropImgLink = imgUrl => imgUrl ? `https://image.tmdb.org/t/p/original${imgUrl}` : imgPlaceholder

    const handleInputChange = e => {
        setSearchQuery(e.target.value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        searchByQuery()
    }

    const searchByQuery = async () => {
        const res = []
        const totalPages = 8
        for (let i = 1; i <= totalPages; i++) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${i}&language=en-US`
            const data = await request(url)
            data.results.forEach(movie => res.push(movie))
        }
        setSearchMovies(res)
    }

    const getTrending = async () => {
        const res = []
        const totalPages = 8
        for (let i = 1; i <= totalPages; i++) {
            const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&page=${i}&language=en-US`
            const data = await request(url)
            data.results.forEach(movie => res.push(movie))
        }
        setTrendingMovies(res)
    }


    // useEffect
    useEffect(() => {
        getTrending()
    }, [])

    // useEffect(() => {
    //     if (searchQuery === '') return
    //     searchByQuery()
    // }, [searchQuery])

    return (
        <section id="about">
            <div className="container">
                <form className="searchInput" onSubmit={handleFormSubmit}>
                    <label htmlFor="searchInput">Search movie</label>
                    <div className="inputLine">
                        <input onChange={handleInputChange} id={'searchInput'} type="text"/>
                        <button type={"submit"}>Search</button>
                    </div>
                </form>
                {
                    loading
                        ? <Loader/>
                        : <div className="queryMovies">
                            {
                                refSearchMovies.current?.length !== 0
                                    ? refSearchMovies.current?.map((el, i) => {
                                        return(
                                            <div className="movieItem" key={el.id + i}>
                                                <MovieCard el={el} getBackdropImgLink={getBackdropImgLink}/>
                                            </div>
                                        )
                                    })
                                    : refTrendingMovies.current?.length !== 0
                                        ? refTrendingMovies.current?.map((el, i) => {
                                            return (
                                                <div className="movieItem" key={el.id + i}>
                                                    <MovieCard el={el} getBackdropImgLink={getBackdropImgLink}/>
                                                </div>
                                            )
                                        })
                                        : error ? <h1>{ error.message || 'Error' }</h1> : <h1>Empty</h1>
                            }
                        </div>
                }
            </div>
        </section>
    )
}